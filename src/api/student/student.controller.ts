import { Controller, Param, Post, Get, Body, Delete, UseGuards } from '@nestjs/common';
import { StudentService } from './student.service';
import { User } from 'src/libs/user/user.entitiy';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from 'src/libs/enum/user-role.enum';
import { RolesGuard } from '../auth/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';

@Roles(UserRole.STUDENT)
@UseGuards(AuthGuard(), RolesGuard)
@Controller({path: 'student', version: '1'})
export class StudentController {
    constructor(private studentService: StudentService) {}

    @Post('/subscribe/:schoolId')
    subscribe(
        @Param('schoolId') schoolId: number,
        @GetUser() user: User
    ){
        return this.studentService.subscribe(user, schoolId);
    }

    // JWT 구현 후 Get수정 필요
    @Get('/subscribe')
    getSubscribeList(@GetUser() user: User) {
        return this.studentService.getSubscribeList(user);
    }

    @Get('/:schoolId/news')
    getNewsBySchool(@Param('schoolId') schoolId: number) {
        return this.studentService.getNewsBySchool(schoolId);
    }

    @Delete('/subscribe-cancel/:id')
    subscribeCancel(
        @Param('id') id: number,
        @GetUser() user: User,
    ) {
        return this.studentService.deleteSubscribeById(id, user);
    }

}
