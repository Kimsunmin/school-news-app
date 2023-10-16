import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from 'src/libs/user/user.repository';
import { JwtService } from '@nestjs/jwt'
import { AuthUserDto } from 'src/libs/dto/auth-user.dto';
import { User } from 'src/libs/user/user.entitiy';

@Injectable()
export class AuthService {
    constructor(
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ) {}

    async singIn(authUserDto: AuthUserDto) {
        const { username, password, role } = authUserDto;
        const user: User = await this.userRepository.findOne({
            where: { username }
        });

        // 추후 암호화 추가
        if(user &&  user.password === password){
            const payload = { id: user.id, username, role };
            const accessToken = this.jwtService.sign(payload);

            return { accessToken };
        } else {
            throw new UnauthorizedException('login failed');
        }
    }
}
