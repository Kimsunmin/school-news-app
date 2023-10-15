import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { News } from 'src/libs/news/news.entitiy';
import { Subscribe } from 'src/libs/subscribe/subscribe.entitiy';
import { School } from 'src/libs/school/school.entitiy';
import { NewsRepository } from 'src/libs/news/news.repository';
import { SubscribeRepository } from 'src/libs/subscribe/subscribe.repository';
import { SchoolRepository } from 'src/libs/school/school.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ News, Subscribe, School ])
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
