import "dotenv/config";
import "reflect-metadata";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { createClient } from "redis";
import { buildSchema } from "type-graphql";
import { Context } from "./context";
import { TestingResolvers } from "./resolvers/TestingResolvers";
import { tester } from "./tester";
import { ClientResolvers } from "./resolvers/ClientResolvers";
import cookieParser from "cookie-parser";
import cors from "cors";

// import { Client as NTPClient } from "ntp-time";

// const ntp = new NTPClient("time.cloudflare.com");

async function main() {
  // console.log((await ntp.syncTime()).time.getTime() - new Date().getTime());
  const app = express();
  app.use(cookieParser());
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true
    })
  );

  const redis = createClient({
    url: process.env.REDIS_STRING
  });

  await redis.connect();

  const testing = redis.duplicate();

  await testing.connect();

  testing.subscribe("testing", (testId) => {
    tester(testId, redis as any);
  });

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [TestingResolvers, ClientResolvers],
      authChecker: ({ context: { clientId } }) => {
        if (clientId) {
          return true;
        } else {
          return false;
        }
      }
    }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    context: async ({ req, res }) => {
      return {
        clientId: req.headers.authorization ?? "",
        db: redis,
        req,
        res
      } as Context;
    }
  });

  await server.start();

  server.applyMiddleware({
    app,
    cors: false
  });

  app.listen(8080, () => {
    console.log("API Listening on http://localhost:8080/graphql");
  });
}

main();
