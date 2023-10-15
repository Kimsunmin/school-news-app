import { UserJob } from "../enum/user-job.enum";

export class AuthUserDto {
    username: string;
    password: string;
    job: UserJob;
}