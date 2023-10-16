import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Roles } from "./roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean  {
        const roles = this.reflector.get(Roles, context.getClass());

        if(!roles){
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user;

        return roles === user.role;
    }

}