import { NTPClient } from "ntpclient";
import { RedisClientType } from "redis";
import io from "socket.io-client";
import { Client } from "./objects/Client";

const ntp = new NTPClient("time.cloudflare.com");

export async function tester(testId: string, redis: RedisClientType) {
  let diff = 0;
  // console.log("started");
  const socket = io.connect("https://buzzin.live", {
    transports: ["websocket"]
  });

  socket.on("connect_error", (err: any) => {
    console.log(`connect_error due to ${err.message}`);
  });

  socket.on("connect", () => {
    // console.log("connected");
    socket.emit("hostConnect");
  });

  // socket.on("setPenaltyTime", (data: any) => {
  //   // console.log(data);
  // });

  // socket.on("setPointsIncrement", (data: any) => {
  //   // console.log(data);
  // });

  socket.on("gameCreated", async (data: any) => {
    if (testId.length > 0) {
      const time = await ntp.getNetworkTime();

      diff = time.getTime() - new Date().getTime();

      await redis.set(
        testId,
        JSON.stringify({
          gameCode: data.gameCode,
          timestamps: []
        } as Client)
      );
    }
  });

  socket.on("err", (data: any) => {
    console.log(data);
  });

  socket.on("ding", () => {
    // console.log("dong");
    socket.emit("dong");
  });

  // socket.on("players", (data: any) => {
  //   // console.log(data);
  // });

  socket.on("buzzes", async (data: any) => {
    const timestamp = new Date();
    // socket.emit("clearAllBuzzes");
    // console.log(data);
    if (data.buzzArr.length !== 0 && testId.length > 0) {
      const oldData = JSON.parse((await redis.get(testId)) ?? "") as Client;

      oldData.timestamps.push(timestamp.getTime() + diff);
      redis.set(testId, JSON.stringify(oldData));

      socket.emit("clearAllBuzzes");

      if (oldData.timestamps.length >= 20) {
        socket.emit("endGame");
        socket.disconnect();
      }
      // console.log("buzz");
    }
  });
  //   socket.on("");
}
