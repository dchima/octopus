import { GraphQLDate } from 'graphql-iso-date';
import { Account } from '../controllers';

const {
  addAccount, getAccount
} = Account;

const resolvers = {

  Date: GraphQLDate,
  Query: {
    getAccount,
  },

  Mutation: {

    addAccount,

  },
};

module.exports = resolvers;
