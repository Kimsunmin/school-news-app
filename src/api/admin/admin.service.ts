import { Injectable } from '@nestjs/common';
import { CreateNewsDto } from 'src/libs/dto/create-news.dto';
import { CreateSchoolDto } from 'src/libs/dto/create-school.dto';
import { NewsRepository } from 'src/libs/news/news.repository';
import { School } from 'src/libs/school/school.entitiy';
import { SchoolRepository } from 'src/libs/school/school.repository';
import { User } from 'src/libs/user/user.entitiy';

@Injectable()
export class AdminService {
    constructor(
        private schoolRespository: SchoolRepository,
        private newsRepository: NewsRepository,
    ) {}

    createSchool(createSchoolDto: CreateSchoolDto, user: User) {
        return this.schoolRespository.createSchool(createSchoolDto, user);
    }

    async createNews(createNewsDto: CreateNewsDto, schoolId: number, user: User) {
        const school: School = await this.schoolRespository.findOne({where: {id: schoolId}});
        return this.newsRepository.createNews(createNewsDto, school, user);
    }

    updateNews(createNewsDto: CreateNewsDto, newsId: number, user: User) {
        return this.newsRepository.updateNews(createNewsDto, newsId, user);
    }

    deleteNews(newsId: number) {
        return this.newsRepository.deleteNews(newsId);
    }
}
