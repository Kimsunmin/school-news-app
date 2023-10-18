import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { News } from '@libs/news/news.entitiy';
import { School } from '@libs/school/school.entitiy';
import { SchoolRepository } from '@libs/school/school.repository';
import { NewsRepository } from '@libs/news/news.repository';
import { AuthModule } from '../auth/auth.module';



@Module({
  imports: [
    TypeOrmModule.forFeature([ News ,School ]),
    AuthModule,
  ],
  controllers: [AdminController],
  providers: [
    AdminService,
    SchoolRepository,
    NewsRepository,
  ]
})
export class AdminModule {}
