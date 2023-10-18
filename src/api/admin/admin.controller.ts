import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminService } from './admin.service';
import { CreateNewsDto } from '@libs/dto/create-news.dto';
import { CreateSchoolDto } from '@libs/dto/create-school.dto';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '@libs/enum/user-role.enum';
import { RolesGuard } from '../auth/roles.guard';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '@libs/user/user.entitiy';
import { ApiTags, ApiOperation, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { School } from '@libs/school/school.entitiy';
import { News } from '@libs/news/news.entitiy';

@Roles(UserRole.ADMIN)
@UseGuards(AuthGuard(), RolesGuard)
@Controller({path: 'admin', version: '1'})
@ApiTags('관리자 API')
@ApiBearerAuth()
export class AdminController {

    constructor(private adminService: AdminService) {}

    @Post('/create-school')
    @ApiOperation({ summary: '학교 페이지 생성', description: '학교 페이지를 생성한다.' })
    @ApiBody({ description: '학교 페이지 정보', type: CreateSchoolDto })
    createSchool(
        @Body() createSchoolDto: CreateSchoolDto,
        @GetUser() user: User,
    ): Promise<School> {
        return this.adminService.createSchool(createSchoolDto, user);
    }

    // 학교 소식 생성
    @Post('/:schoolId/create-news')
    @ApiOperation({ summary: '학교 소식 생성', description: '학교 소식을 생성한다.' })
    @ApiBody({ description: '학교 소식 정보', type: CreateNewsDto })
    createNews(
        @Param('schoolId') schoolId: number,
        @Body() createNewsDto: CreateNewsDto,
        @GetUser() user: User,
    ): Promise<News> {
        return this.adminService.createNews(createNewsDto, schoolId, user);
    }

    // 학교 소식 수정
    @Patch('/update-news/:newsId')
    @ApiOperation({ summary: '학교 소식 수정', description: '학교 소식을 수정한다.' })
    @ApiBody({ description: '학교 소식 수정 정보', type: CreateNewsDto })
    updateNews(
        @Body() createNewsDto: CreateNewsDto,
        @Param('newsId') newsId: number,
        @GetUser() user: User,
    ): Promise<News> {
        return this.adminService.updateNews(createNewsDto, newsId, user);
    }
    
    // 학교 소식 삭제
    @Delete('/delete-news/:newsId')
    @ApiOperation({ summary: '학교 소식 삭제', description: '학교 소식을 삭제한다.' })
    deleteNews(
        @Param('newsId') newsId: number,
        @GetUser() user: User,
    ): Promise<void> {
        return this.adminService.deleteNews(newsId);
    }

}
