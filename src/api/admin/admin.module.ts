import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { News } from 'src/libs/news/news.entitiy';
import { School } from 'src/libs/school/school.entitiy';
import { SchoolRepository } from 'src/libs/school/school.repository';
import { NewsRepository } from 'src/libs/news/news.repository';



@Module({
  imports: [
    TypeOrmModule.forFeature([ News ,School ])
  ],
  controllers: [AdminController],
  providers: [
    AdminService,
    SchoolRepository,
    NewsRepository,
  ]
})
export class AdminModule {}
