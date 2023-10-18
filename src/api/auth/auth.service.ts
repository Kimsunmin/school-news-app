import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '@libs/user/user.repository';
import { JwtService } from '@nestjs/jwt'
import { AuthUserDto } from '@libs/dto/auth-user.dto';
import { User } from '@libs/user/user.entitiy';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ) {}

    async signUp(authUserDto: AuthUserDto): Promise<void> {
        return this.userRepository.createUser(authUserDto);
    }

    async singIn(authUserDto: AuthUserDto): Promise<{ accessToken: string }> {
        const { username, password, role } = authUserDto;
        const user: User = await this.userRepository.findOne({
            where: { username }
        });

        // 추후 암호화 추가
        if(user && ( await bcrypt.compare(password, user.password))){
            const payload = { id: user.id, username, role };
            const accessToken = this.jwtService.sign(payload);

            return { accessToken };
        } else {
            throw new UnauthorizedException('login failed');
        }
    }
}
