import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { config } from './env';
import { initializeDatabase } from './db';
import { typeDefs } from './schema/typeDefs';
import { resolvers } from './schema/resolvers';

const app: Express = express();
const PORT = config.port;

async function startServer() {
  try {
    // Initialize database
    await initializeDatabase();

    // Middleware
    app.use(express.json());

    // CORS configuration
    app.use(
      cors({
        origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
      })
    );

    // Create Apollo Server
    const server = new ApolloServer({
      typeDefs,
      resolvers
    });

    // Start Apollo Server
    await server.start();

    // Apply Apollo middleware
    app.use('/graphql', expressMiddleware(server));

    // Health check endpoint
    app.get('/health', (req: Request, res: Response) => {
      res.json({ status: 'ok' });
    });

    // Start Express server
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}/graphql`);
      console.log(
        `📊 GraphQL Playground available at http://localhost:${PORT}/graphql`
      );
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
