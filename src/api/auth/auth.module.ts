import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from '@libs/user/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { RolesGuard } from './roles.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    // JwtModule.register({
    //   secret: 'classting1234',
    //   signOptions: {
    //     expiresIn: 60 * 60,
    //   }
    // }),
    JwtModule.registerAsync({
      imports: [ ConfigModule ],
      inject: [ ConfigService ],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('SECRET_KEY'),
          signOptions: {
            expiresIn: configService.get<string>('EXPIRES_IN'),
          }
        }
      }
    }),
    PassportModule.register({
      defaultStrategy: 'jwt'
    })
  ],
  controllers: [AuthController], 
  providers: [
    AuthService,
    JwtStrategy,
    UserRepository,
    RolesGuard,
  ],
  exports: [
    JwtStrategy,
    PassportModule,
    RolesGuard,
  ]
})
export class AuthModule {}
