import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigType, ConfigModule, ConfigService } from '@nestjs/config';

import { AuthService } from './services/auth.service';
import { UsersModule } from '../components/sql/users/users.module';
import { UsersModule2 } from '../components/nosql/users/users.module';

import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './controllers/auth.controller';

import { config } from '../config/config';
@Module({
  imports: [
    UsersModule2,
    UsersModule,
    PassportModule,

    //JwtModule.register({
    //  secret: 'jwtConstants.secret',
    //  signOptions: { expiresIn: '60s' },
    //}),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: `30s`,
        },
      }),
    }),

    //JwtModule.registerAsync({
    //  inject: [config.KEY],
    //  useFactory: (configService: ConfigType <typeof config>) => {
    //    return {
    //      secret: configService.jwtScret,
    //      signOptions: {
    //        expiresInL: '10s'
    //      },
    //    };
    //  },
    //}),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
