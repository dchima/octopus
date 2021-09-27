import { gql } from 'apollo-server-express';

const typeDefs = gql`
scalar Date

  type accounts {
    id: String!
    account_name: String!
    account_number: String!
    bank_code: String!
    paystack_account_name: String
    bank_name: String
    is_verified: Boolean
  }

  type Query {
    getAccount( account_number: String!, bank_code: String! ): String!
  }

  type Mutation {
    addAccount(
      account_name: String!,
      account_number: String!,
      bank_code: String!,
    ): accounts!
  }
`;

module.exports = typeDefs;
