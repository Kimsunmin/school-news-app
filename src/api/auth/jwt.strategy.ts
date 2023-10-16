import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from '@nestjs/passport';
import { UserRepository } from "src/libs/user/user.repository";
import { User } from "src/libs/user/user.entitiy";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private userRepository: UserRepository
    ) {
        super({
            secretOrKey: 'classting1234',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    async validate(payload): Promise<User> {
        const { username } = payload;
        const user: User = await this.userRepository.findOne({
            where: {
                username
            }
        });
        
        if(!user){
            throw new UnauthorizedException();
        }
        return user;
    }
}