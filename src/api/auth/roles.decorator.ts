import { Reflector } from '@nestjs/core';
import { UserRole } from 'src/libs/enum/user-role.enum';

export const Roles = Reflector.createDecorator<UserRole>();