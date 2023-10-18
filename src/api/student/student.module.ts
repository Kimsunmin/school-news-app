import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { News } from '@libs/news/news.entitiy';
import { Subscribe } from '@libs/subscribe/subscribe.entitiy';
import { School } from '@libs/school/school.entitiy';
import { NewsRepository } from '@libs/news/news.repository';
import { SubscribeRepository } from '@libs/subscribe/subscribe.repository';
import { SchoolRepository } from '@libs/school/school.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ News, Subscribe, School ]),
    AuthModule,
  ],
  controllers: [StudentController],
  providers: [
    StudentService,
    SchoolRepository,
    NewsRepository,
    SubscribeRepository,
  ]
})
export class StudentModule {}
