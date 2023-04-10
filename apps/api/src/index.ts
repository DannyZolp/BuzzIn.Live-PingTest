import { PrismaClient } from "@prisma/client";
import { json } from "body-parser";
import cors from "cors";
import express from "express";
import expressWs from "express-ws";
import dotenv from "dotenv";
import { authenticated } from "./auth/authenticated";
import io from "socket.io-client";
dotenv.config();

let currentGame: SocketIOClient.Socket;
let currentTest = "";

const main = async () => {
  const db = new PrismaClient();

  await db.$connect();

  const { app, getWss } = expressWs(express());
  const wss = getWss();

  app.use(cors(), json());

  app.get("/time", authenticated(db), (_req, res) => {
    res.json({
      time: new Date().getTime()
    });
  });

  app.post("/login", async (req, res) => {
    if (req.body.password === process.env.PASSWORD) {
      // the user is authenticated

      const client = await db.client.create({
        data: {
          name: req.body.name
        }
      });

      res.json({
        token: client.id
      });
    }
  });

  app.ws("/ws", (ws, req) => {
    db.client
      .count({
        where: { id: req.headers.authorization?.split(" ")[1] }
      })
      .then(async (count) => {
        if (count > 0) {
          await db.client.update({
            where: {
              id: req.headers.authorization?.split(" ")[1]
            },
            data: {
              active: true
            }
          });
        } else {
          ws.terminate();
        }
      })
      .catch(() => {
        ws.terminate();
      });

    ws.on("close", async () => {
      if (
        (await db.client.count({
          where: { id: req.headers.authorization?.split(" ")[1] }
        })) > 0
      ) {
        await db.client.update({
          where: {
            id: req.headers.authorization?.split(" ")[1]
          },
          data: {
            active: false
          }
        });
      }
    });

    ws.on("message", async (msg) => {
      switch (msg.toString().split(" ")[0]) {
        case "run":
          const { id } = await db.test.create({
            data: {
              activeClients: await db.client.count({ where: { active: true } })
            }
          });
          currentTest = id;
          for (let client of wss.clients) {
            client.send(msg);
          }
          break;
        case "disconnect":
          currentGame.emit("endGame").disconnect();
          for (let client of wss.clients) {
            client.send("disconnect");
          }
          break;
        case "setup":
          // create a buzzin room
          currentGame = io.connect("https://buzzin.live", {
            transports: ["websocket"]
          });
          currentGame.on("connect", () => {
            currentGame.emit("hostConnect");
          });
          currentGame.on("ding", () => {
            currentGame.emit("dong");
          });
          currentGame.on("buzzes", async (data: any) => {
            if (
              data.buzzArr.length ===
              (await db.client.count({ where: { active: true } })) - 1
            ) {
              await db.test.update({
                where: {
                  id: currentTest
                },
                data: {
                  buzzes: data.buzzArr.map((b) => ({
                    clientId: b.username,
                    timestamp: b.time
                  }))
                }
              });
              currentTest = "";
            }
          });
          currentGame.on("gameCreated", async (data: any) => {
            for (let client of wss.clients) {
              client.send(`connect ${data.gameCode}`);
            }
          });
          break;
      }
    });
  });

  app.listen(4000, () => {
    console.log("API Listening on :4000");
  });
};

main();
