import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { setUpSwagger } from './config/swagger/init.swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get<ConfigService>(ConfigService);

  const port = configService.get<number>('NEST_PORT');

  setUpSwagger(app);

  await app.listen(port);

  console.log(`Server is open on port ${port}`);
}
bootstrap();
