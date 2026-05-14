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

const corsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) => {
    callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Type'],
  optionsSuccessStatus: 200
};

async function startServer() {
  try {
    // Initialize database
    await initializeDatabase();

    // CORS must be first
    app.use(cors(corsOptions));

    // Handle preflight requests
    app.options('*', cors(corsOptions));

    // Middleware
    app.use(express.json());

    // Create Apollo Server with CORS
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      csrfPrevention: false
    });

    // Start Apollo Server
    await server.start();

    // Apply Apollo middleware with context
    app.use(
      '/graphql',
      cors(corsOptions),
      express.json(),
      expressMiddleware(server, {
        context: async ({ req }) => ({
          req
        })
      })
    );

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
