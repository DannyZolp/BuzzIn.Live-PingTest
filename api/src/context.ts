import { Response, Request } from "express";
import { RedisClientType } from "redis";

export interface Context {
  clientId: string;
  db: RedisClientType;
  req: Request;
  res: Response;
}
