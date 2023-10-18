import { Controller, Param, Post, Get, Body, Delete, UseGuards } from '@nestjs/common';
import { StudentService } from './student.service';
import { User } from '@libs/user/user.entitiy';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '@libs/enum/user-role.enum';
import { RolesGuard } from '../auth/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Subscribe } from '@libs/subscribe/subscribe.entitiy';
import { News } from '@libs/news/news.entitiy';

@Roles(UserRole.STUDENT)
@UseGuards(AuthGuard(), RolesGuard)
@Controller({path: 'student', version: '1'})
@ApiTags('학생 API')
@ApiBearerAuth('access-token')
export class StudentController {
    constructor(private studentService: StudentService) {}

    @Post('/subscribe/:schoolId')
    @ApiOperation({ summary: '학교 페이지 구독', description: '학교 페이지를 구독한다.' })
    subscribe(
        @Param('schoolId') schoolId: number,
        @GetUser() user: User
    ): Promise<Subscribe>{
        return this.studentService.subscribe(user, schoolId);
    }


    @Get('/subscribe')
    @ApiOperation({ summary: '구독 목록 조회', description: '구독한 학교 페이지 목록을 조회한다.' })
    getSubscribeList(@GetUser() user: User): Promise<Subscribe[]> {
        return this.studentService.getSubscribeList(user);
    }

    @Get('/:schoolId/news')
    @ApiOperation({ summary: '학교 페이지 소식 조회', description: '구독한 학교 페이지의 소식을 조회한다.' })
    getNewsBySchool(@Param('schoolId') schoolId: number): Promise<News[]> {
        return this.studentService.getNewsBySchool(schoolId);
    }

    @Delete('/subscribe-cancel/:id')
    @ApiOperation({ summary: '학교 페이지 구독 취소', description: '구독한 학교 페이지의 구독을 취소한다.' })
    subscribeCancel(
        @Param('id') id: number,
        @GetUser() user: User,
    ): Promise<void> {
        return this.studentService.deleteSubscribeById(id, user);
    }

}
