import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AdminRepository } from './repository/admin.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './entitiy/admin.entitiy';
import { School } from './entitiy/school.entitiy';
import { SchoolRepository } from './repository/school.repository';
import { NewsRepository } from './repository/news.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ Admin, School ])
  ],
  controllers: [AdminController],
  providers: [
    AdminService,
    AdminRepository,
    SchoolRepository,
    NewsRepository,
  ]
})
export class AdminModule {}
