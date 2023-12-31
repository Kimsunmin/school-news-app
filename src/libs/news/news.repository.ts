import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { News } from './news.entitiy';
import { CreateNewsDto } from '../dto/create-news.dto';
import { School } from '../school/school.entitiy';
import { User } from '../user/user.entitiy';


@Injectable()
export class NewsRepository extends Repository<News> {
    constructor(private dataSource: DataSource){
        super(News, dataSource.createEntityManager());
    }

    async createNews(createNewsDto: CreateNewsDto, school: School, user: User): Promise<News> {
        const { title, description } = createNewsDto;

        const news: News = this.create({
            title,
            description,
            school,
            user,
        });

        return this.save(news);
    }

    async getNewsById(newsId: number): Promise<News> {
        const found: News = await this.findOne({where: {id: newsId}});

        if(!found) {
            throw new NotFoundException(`Not found News with id ${newsId}`);
        }
        return found;
    }

    async getNewsBySchoolId(schoolId: number): Promise<News[]> {
        const found: News[] = await this.find({where: {school: {id: schoolId}}, order: { updatedAt: 'DESC' }});
        return found;
    }

    async updateNews(createNewsDto: CreateNewsDto, newsId: number, user: User): Promise<News> {
        const found: News = await this.getNewsById(newsId);

        const { title, description } = createNewsDto;
        found.title = title;
        found.description = description;
        found.user = user;

        return this.save(found);
    }

    async deleteNews(newsId: number): Promise<void> {

        const result = await this.softDelete(newsId);
        
        if(result.affected === 0) {
            throw new NotFoundException(`Can't find News with id ${newsId}`);
        }
    }
}