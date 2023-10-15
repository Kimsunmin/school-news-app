import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/libs/user/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([ UserRepository ]),
    JwtModule.register({
      secret: 'classting1234',
      signOptions: {
        expiresIn: 60 * 60,
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
  ]
})
export class AuthModule {}
