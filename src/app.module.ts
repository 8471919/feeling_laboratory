import {
  Logger,
  MiddlewareConsumer,
  Module,
  NestModule,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import { HttpExceptionFilter } from './middlewares/filters/http-exception.filter';
import { TransformInterceptor } from './middlewares/interceptors/transform.interceptor';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { QuestionnaireModule } from './res/questionnaire/questionnaire.module';
import { QuestionModule } from './res/question/question.module';
// import { UserModule } from './res/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [
          path.join(__dirname, '/entities/**/*.entity.ts'),
          path.join(__dirname, '/entities/**/*.entity.js'),
        ],
        timezone: 'local',
        logging: true,
        synchronize: false,
      }),
    }),
    // UserModule,
    QuestionnaireModule,
    QuestionModule,
  ],
  controllers: [],
  providers: [
    Logger,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
