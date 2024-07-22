import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const hostname = '127.0.0.1'
  const port = 3000;
  // Uncomment these lines to use the Redis adapter:
  // const redisIoAdapter = new RedisIoAdapter(app);
  // await redisIoAdapter.connectToRedis();
  // app.useWebSocketAdapter(redisIoAdapter);

  await app.listen(port, hostname);
  console.log(`Application is running on: ${await app.getUrl()}`);

  const server = app.getHttpServer();
  const router = server._events.request._router;

}
bootstrap();
