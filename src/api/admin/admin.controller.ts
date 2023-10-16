import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminService } from './admin.service';
import { CreateNewsDto } from '../../libs/dto/create-news.dto';
import { CreateSchoolDto } from 'src/libs/dto/create-school.dto';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from 'src/libs/enum/user-role.enum';
import { RolesGuard } from '../auth/roles.guard';
import { GetUser } from '../auth/get-user.decorator';
import { User } from 'src/libs/user/user.entitiy';
import { ApiTags } from '@nestjs/swagger';

@Roles(UserRole.ADMIN)
@UseGuards(AuthGuard(), RolesGuard)
@Controller({path: 'admin', version: '1'})
@ApiTags('관리자 API')
export class AdminController {

    constructor(private adminService: AdminService) {}

    // 학교 페이지 생성(지역명, 학교명)
    @Post('/create-school')
    createSchool(
        @Body() createSchoolDto: CreateSchoolDto,
        @GetUser() user: User,
    ) {
        return this.adminService.createSchool(createSchoolDto, user);
    }

    // 학교 소식 생성
    @Post('/:schoolId/create-news')
    createNews(
        @Param('schoolId') schoolId: number,
        @Body() createNewsDto: CreateNewsDto,
        @GetUser() user: User,
    ) {
        return this.adminService.createNews(createNewsDto, schoolId, user);
    }

    // 학교 소식 수정
    @Patch('/update-news/:newsId')
    updateNews(
        @Body() createNewsDto: CreateNewsDto,
        @Param('newsId') newsId: number,
        @GetUser() user: User,
    ) {
        return this.adminService.updateNews(createNewsDto, newsId, user);
    }
    
    // 학교 소식 삭제
    @Delete('/delete-news/:newsId')
    deleteNews(
        @Param('newsId') newsId: number,
        @GetUser() user: User,
    ) {
        return this.adminService.deleteNews(newsId);
    }

}
