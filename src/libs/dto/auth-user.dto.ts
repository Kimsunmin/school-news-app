import { UserRole } from "../enum/user-role.enum";
import { ApiProperty} from '@nestjs/swagger';

export class AuthUserDto {
    @ApiProperty({
        example: 'test1',
        description: '사용자명',
        required: true,
    })
    username: string;

    @ApiProperty({
        example: 'test1',
        description: '비밀번호',
        required: true,
    })
    password: string;

    @ApiProperty({
        example: 'ADMIN',
        description: '사용자 권한',
        enum: UserRole,
        required: true,
    })
    role: UserRole;
}