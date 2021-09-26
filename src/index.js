/* eslint-disable prefer-destructuring */
/* eslint-disable no-console */
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import { typeDefs, resolvers } from './generated';
import models from './models';
import { toolbox } from './utils';
import { env, config } from './config';

/**
 * initialise the apollo server.
 * We also need to make sure the cookies are checked upon
 * calling the queries in the client (If cookies exist)
 */

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    let token;
    if (req.headers.cookie) token = req.headers.cookie.split('=')[1];
    if (req.headers.authorization) token = req.headers.authorization.split(' ')[1];
    const verified = toolbox.jwtCheck(token);
    return { req, verified };
  }
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
