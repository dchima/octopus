import { GraphQLDate } from 'graphql-iso-date';
import { Account } from '../controllers';

const {
  addAccount
} = Account;

const resolvers = {

  Date: GraphQLDate,
  Query: {
    user: () => 'hello world'
  },

  Mutation: {

    addAccount,

  },
};

module.exports = resolvers;
