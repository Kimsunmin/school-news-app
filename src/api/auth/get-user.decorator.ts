import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "src/libs/user/user.entitiy";

export const GetUser = createParamDecorator((data, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
})