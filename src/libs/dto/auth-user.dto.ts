import { UserRole } from "../enum/user-role.enum";

export class AuthUserDto {
    username: string;
    password: string;
    role: UserRole;
}