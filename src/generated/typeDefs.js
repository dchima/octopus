import { gql } from 'apollo-server-express';

const typeDefs = gql`
scalar Date

  type accounts {
    id: String!
    account_name: String!
    account_number: String!
    bank_code: String!
    bank_name: String
    is_verified: Boolean
  }

  type Query {
    get_account( account_number: String! ): accounts!
    user: String!
  }

  type Mutation {
    verify_account(
      account_name: String!,
      account_number: String!,
      bank_name: String!,
    ): String!

    add_account(
      email: String!,
      account_name: String!,
      account_number: String!,
      bank_name: String!,
    ): accounts!
  }
`;

module.exports = typeDefs;
