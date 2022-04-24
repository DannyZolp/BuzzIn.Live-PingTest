import { Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { Context } from "../context";

@Resolver()
export class TestingResolvers {
  @Mutation(() => String)
  @Authorized()
  async startTest(@Ctx() { db, clientId }: Context) {
    const oldCode = JSON.parse((await db.get(clientId)) ?? "").gameCode;

    db.publish("testing", clientId);

    while (JSON.parse((await db.get(clientId)) ?? "").gameCode === oldCode) {
      await new Promise((res) => setTimeout(res, 100));
    }

    return JSON.parse((await db.get(clientId)) ?? "").gameCode;
  }
}
