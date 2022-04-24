import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Client {
  @Field(() => String)
  gameCode: string;

  @Field(() => [Number])
  timestamps: number[];
}
