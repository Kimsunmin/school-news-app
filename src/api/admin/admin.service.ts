import { Injectable } from '@nestjs/common';
import { CreateNewsDto } from '@libs/dto/create-news.dto';
import { CreateSchoolDto } from '@libs/dto/create-school.dto';
import { NewsRepository } from '@libs/news/news.repository';
import { School } from '@libs/school/school.entitiy';
import { SchoolRepository } from '@libs/school/school.repository';
import { User } from '@libs/user/user.entitiy';
import { News } from '@libs/news/news.entitiy';

@Injectable()
export class AdminService {
    constructor(
        private schoolRespository: SchoolRepository,
        private newsRepository: NewsRepository,
    ) {}

    createSchool(createSchoolDto: CreateSchoolDto, user: User): Promise<School> {
        return this.schoolRespository.createSchool(createSchoolDto, user);
    }

    async createNews(createNewsDto: CreateNewsDto, schoolId: number, user: User): Promise<News> {
        const school: School = await this.schoolRespository.findOne({where: {id: schoolId}});
        return this.newsRepository.createNews(createNewsDto, school, user);
    }

    updateNews(createNewsDto: CreateNewsDto, newsId: number, user: User): Promise<News> {
        return this.newsRepository.updateNews(createNewsDto, newsId, user);
    }

    deleteNews(newsId: number): Promise<void> {
        return this.newsRepository.deleteNews(newsId);
    }
}
