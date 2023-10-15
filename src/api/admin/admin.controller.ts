import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateNewsDto } from '../../libs/dto/create-news.dto';
import { CreateSchoolDto } from 'src/libs/dto/create-school.dto';

@Controller({path: 'admin', version: '1'})
export class AdminController {

    constructor(private adminService: AdminService) {}

    // 학교 페이지 생성(지역명, 학교명)
    @Post('/create-school')
    createSchool(@Body() createSchoolDto: CreateSchoolDto) {
        return this.adminService.createSchool(createSchoolDto);
    }

    // 학교 소식 생성
    @Post('/:schoolId/create-news')
    createNews(
        @Param('schoolId') schoolId: number,
        @Body() createNewsDto: CreateNewsDto,
    ) {
        return this.adminService.createNews(createNewsDto, schoolId);
    }

    // 학교 소식 수정
    @Patch('/update-news/:newsId')
    updateNews(
        @Body() createNewsDto: CreateNewsDto,
        @Param('newsId') newsId: number,
    ) {
        return this.adminService.updateNews(createNewsDto, newsId);
    }
    
    // 학교 소식 삭제
    @Delete('/delete-news/:newsId')
    deleteNews(@Param('newsId') newsId: number) {
        return this.adminService.deleteNews(newsId);
    }

}
