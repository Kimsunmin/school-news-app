import { Body, Controller, Post } from '@nestjs/common';
import { AuthUserDto } from 'src/libs/dto/auth-user.dto';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';

@Controller({path: 'auth', version: '1'})
@ApiTags('유저 API')
export class AuthController {
    constructor(private authService: AuthService){}


    @Post('/signin')
    signIn(@Body() authUSerDto: AuthUserDto){
        return this.authService.singIn(authUSerDto);
    }
}
