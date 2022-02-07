import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { JwtStrategyService } from './auth/jwt-strategy.service';
import { HttpModule } from '@nestjs/axios';
import { SeriesModule } from './series/series.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.POSTGRE_URL_CONNECTION,
      autoLoadEntities: true,
      synchronize: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    }),
    HttpModule,
    AuthModule,
    UsersModule,
    SeriesModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService, JwtStrategyService],
})
export class AppModule {}
