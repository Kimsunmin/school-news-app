import { Injectable } from '@nestjs/common';
import { NewsRepository } from 'src/libs/news/news.repository';
import { School } from 'src/libs/school/school.entitiy';
import { SchoolRepository } from 'src/libs/school/school.repository';
import { Subscribe } from 'src/libs/subscribe/subscribe.entitiy';
import { SubscribeRepository } from 'src/libs/subscribe/subscribe.repository';
import { User } from 'src/libs/user/user.entitiy';

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

    getNewsBySchool(schoolId: number) {
        return this.newsRepository.getNewsBySchoolId(schoolId);
    }

    deleteSubscribeById(id: number, user: User) {
        return this.subscribeRepository.deleteSubscribe(id, user);
    }

}
