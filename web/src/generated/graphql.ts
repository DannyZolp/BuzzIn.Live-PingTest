import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Client = {
  __typename?: 'Client';
  gameCode: Scalars['String'];
  timestamps: Array<Scalars['Float']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  deleteMe: Scalars['Boolean'];
  register: Scalars['String'];
  startTest: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  me: Client;
};

export type DeleteMeMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteMeMutation = { __typename?: 'Mutation', deleteMe: boolean };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'Client', gameCode: string, timestamps: Array<number> } };

export type RegisterMutationVariables = Exact<{ [key: string]: never; }>;


export type RegisterMutation = { __typename?: 'Mutation', register: string };

export type StartTestMutationVariables = Exact<{ [key: string]: never; }>;


export type StartTestMutation = { __typename?: 'Mutation', startTest: string };


export const DeleteMeDocument = gql`
    mutation deleteMe {
  deleteMe
}
    `;
export const MeDocument = gql`
    query me {
  me {
    gameCode
    timestamps
  }
}
    `;
export const RegisterDocument = gql`
    mutation register {
  register
}
    `;
export const StartTestDocument = gql`
    mutation startTest {
  startTest
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    deleteMe(variables?: DeleteMeMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeleteMeMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteMeMutation>(DeleteMeDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'deleteMe', 'mutation');
    },
    me(variables?: MeQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<MeQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<MeQuery>(MeDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'me', 'query');
    },
    register(variables?: RegisterMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<RegisterMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<RegisterMutation>(RegisterDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'register', 'mutation');
    },
    startTest(variables?: StartTestMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<StartTestMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<StartTestMutation>(StartTestDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'startTest', 'mutation');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;