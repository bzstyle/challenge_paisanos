import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { TeamModule } from './modules/team/team.module';
import { FacebookStrategy } from './modules/auth/strategies/facebook.strategy';
import { GoogleStrategy } from './modules/auth/strategies/google.strategy';
import config from './config/config';
import { DatabaseConfig } from './config/db.config';
import { Team } from './modules/team/entity/team.entity';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      envFilePath: ['.env.local'],
    }),
    AuthModule,
    UserModule,
    TeamModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfig,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, FacebookStrategy, GoogleStrategy],
})

@Module({
  imports: [TypeOrmModule.forRoot({
    entities: [Team],
    synchronize: true,
  })],
})

export class AppModule {
  constructor() {}
}
