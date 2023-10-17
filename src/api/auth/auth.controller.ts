import { Body, Controller, Post } from '@nestjs/common';
import { AuthUserDto } from 'src/libs/dto/auth-user.dto';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';

@Controller({path: 'auth', version: '1'})
@ApiTags('유저 API')

export class AuthController {
    constructor(private authService: AuthService){}

    @Post('/signin')
    @ApiOperation({ summary: '유저 토큰 생성', description: '유저 토큰 생성' })
    @ApiBody({ type: AuthUserDto, description: '유저정보' })
    signIn(@Body() authUserDto: AuthUserDto){
        return this.authService.singIn(authUserDto);
    }
}
