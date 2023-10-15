import { Controller, Param, Post, Get, Body, Delete } from '@nestjs/common';
import { StudentService } from './student.service';
import { User } from 'src/libs/user/user.entitiy';

@Controller({path: 'student', version: '1'})
export class StudentController {
    constructor(private studentService: StudentService) {}

    @Post('/subscribe/:schoolId')
    subscribe(
        @Param('schoolId') schoolId: number,
        @Body() user: User
    ){
        return this.studentService.subscribe(user, schoolId);
    }

    // JWT 구현 후 Get수정 필요
    @Post('/subscribe')
    getSubscribeList(@Body() user: User) {
        return this.studentService.getSubscribeList(user);
    }

    @Get('/:schoolId/news')
    getNewsBySchool(@Param('schoolId') schoolId: number) {
        return this.studentService.getNewsBySchool(schoolId);
    }

    @Delete('/subscribe-cancel/:id')
    subscribeCancel(
        @Param('id') id: number,
        @Body() user: User
    ) {
        return this.studentService.deleteSubscribeById(id);
    }

}
