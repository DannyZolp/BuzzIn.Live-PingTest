import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

export const authenticated = (db: PrismaClient) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization?.split(" ") ?? [];

    if (authHeader[0] === "Bearer") {
      const client = await db.client.findUnique({
        where: {
          id: authHeader[1]
        }
      });

      if (client) {
        next();
      } else {
        res.status(401).json({
          error: "Unauthenticated"
        });
      }
    } else {
      res.status(403).json({
        error: "Malformed authorization header"
      });
    }
  };
};
