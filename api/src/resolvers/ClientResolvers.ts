import { addHours } from "date-fns";
import { Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { v4 } from "uuid";
import { Context } from "../context";
import { Client } from "../objects/Client";

@Resolver()
export class ClientResolvers {
  @Query(() => Client)
  @Authorized()
  async me(@Ctx() { clientId, db }: Context) {
    const client = await db.get(clientId);

    if (client) {
      return JSON.parse(client);
    } else {
      throw new Error("Client not found in database");
    }
  }

  @Mutation(() => String)
  async register(@Ctx() { clientId, db }: Context) {
    if (clientId) {
      throw new Error("Client already registered");
    } else {
      const id = v4();

      db.set(
        id,
        JSON.stringify({
          gameCode: "",
          timestamps: []
        } as Client)
      );

      db.expireAt(id, addHours(new Date(), 1));

      return id;
    }
  }

  @Mutation(() => Boolean)
  @Authorized()
  async deleteMe(@Ctx() { clientId, db }: Context) {
    await db.del(clientId);
    return true;
  }
}
