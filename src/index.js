/* eslint-disable prefer-destructuring */
/* eslint-disable no-console */
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import { typeDefs, resolvers } from './generated';
import models from './models';
import { env } from './config';

/**
 * initialise the apollo server.
 */
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, models }),
  debug: false
});

// server
const app = express();
server.applyMiddleware({ app });

// allow cross-origin
app.use(cors());

// sync and authenticate all db models
models.sequelize.authenticate();
models.sequelize.sync();

const PORT = env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on port http://localhost:${PORT}${server.graphqlPath} 🚀 `));

export default app;
