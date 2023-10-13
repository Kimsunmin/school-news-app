import { Injectable } from '@nestjs/common';
import { AdminRepository } from './repository/admin.repository';
import { SchoolRepository } from './repository/school.repository';
import { School } from './entitiy/school.entitiy';
import { CreateSchoolDto } from './dto/create-school.dto';
import { CreateNewsDto } from './dto/create-news.dto';
import { NewsRepository } from './repository/news.repository';

@Injectable()
export class AdminService {
    constructor(
        private adminRepository: AdminRepository,
        private schoolRespository: SchoolRepository,
        private newsRepository: NewsRepository,
    ) {}

    createSchool(createSchoolDto: CreateSchoolDto) {
        return this.schoolRespository.createSchool(createSchoolDto);
    }


    async createNews(createNewsDto: CreateNewsDto, schoolId: number) {
        const school: School = await this.schoolRespository.findOne({where: {id: schoolId}});
        return this.newsRepository.createNews(createNewsDto, school);
    }

    updateNews(createNewsDto: CreateNewsDto, newsId: number) {
        return this.newsRepository.updateNews(createNewsDto, newsId);
    }

    deleteNews(newsId: number) {
        return this.newsRepository.deleteNews(newsId);
    }
}
