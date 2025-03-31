import Fastify from 'fastify';

import { employeeRoutes } from './routes/employee.route';

const startServer = async () => {
  const fastify = Fastify({ logger: true });

  await fastify.register(employeeRoutes);

  try {
    await fastify.listen({ port: 3000 });
    console.log('🚀 Server is running on http://localhost:3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

startServer();
