import { Body, Controller, Post } from '@nestjs/common';
import { AuthUserDto } from '@libs/dto/auth-user.dto';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';

@Controller({path: 'auth', version: '1'})
@ApiTags('유저 API')

export class AuthController {
    constructor(private authService: AuthService){}

    @Post('signon')
    @ApiOperation({ summary: '유저 생성', description: '유저 생성' })
    @ApiBody({ type: AuthUserDto, description: '유저정보' })
    signOn(@Body() authUserDto: AuthUserDto): Promise<void> {
        return this.authService.signUp(authUserDto);
    }

    @Post('/signin')
    @ApiOperation({ summary: '유저 토큰 생성', description: '유저 토큰 생성' })
    @ApiBody({ type: AuthUserDto, description: '유저정보' })
    signIn(@Body() authUserDto: AuthUserDto): Promise<{ accessToken: string }>{
        return this.authService.singIn(authUserDto);
    }
}
