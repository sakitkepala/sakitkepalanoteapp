import { buildServer } from './app';

const server = buildServer(true);

async function start() {
  try {
    await server.listen({ port: 6789 });

    const address = server.server.address();
    const port = typeof address === 'string' ? address : address.port;
    console.log(`Server di http://localhost:${port}`);
  } catch (startupError) {
    server.log.error(startupError);
    process.exit(1);
  }
}

start();
