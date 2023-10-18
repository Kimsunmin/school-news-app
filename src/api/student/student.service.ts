import { Injectable } from '@nestjs/common';
import { NewsRepository } from '@libs/news/news.repository';
import { School } from '@libs/school/school.entitiy';
import { SchoolRepository } from '@libs/school/school.repository';
import { Subscribe } from '@libs/subscribe/subscribe.entitiy';
import { SubscribeRepository } from '@libs/subscribe/subscribe.repository';
import { User } from '@libs/user/user.entitiy';
import { News } from '@libs/news/news.entitiy';

@Injectable()
export class StudentService {
    constructor(
        private subscribeRepository: SubscribeRepository,
        private schoolRepository: SchoolRepository,
        private newsRepository: NewsRepository,
    ) {}

    async subscribe(user: User, schoolId: number): Promise<Subscribe> {
        const school = await this.schoolRepository.getSchoolById(schoolId);
        return this.subscribeRepository.createSubscribe(user, school);
    }

    getSubscribeList(user: User): Promise<Subscribe[]> {
        return this.subscribeRepository.getSubscribeByUser(user);
    }

    getNewsBySchool(schoolId: number): Promise<News[]> {
        return this.newsRepository.getNewsBySchoolId(schoolId);
    }

    deleteSubscribeById(id: number, user: User): Promise<void> {
        return this.subscribeRepository.deleteSubscribe(id, user);
    }

}
