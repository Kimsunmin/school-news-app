import { Body, Controller, Post } from '@nestjs/common';
import { AuthUserDto } from 'src/libs/dto/auth-user.dto';
import { AuthService } from './auth.service';

@Controller({path: 'auth', version: '1'})
export class AuthController {
    constructor(private authService: AuthService){}


    @Post('/signin')
    signIn(@Body() authUSerDto: AuthUserDto){
        return this.authService.singIn(authUSerDto);
    }
}
