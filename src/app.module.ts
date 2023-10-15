import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { DataBaseConfigModule } from './config/db/config.module';
import { DataBaseConfigService } from './config/db/config.service';
import { StudentModule } from './api/student/student.module';
import { AdminModule } from './api/admin/admin.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ DataBaseConfigModule ],
      useClass: DataBaseConfigService,
      inject: [ DataBaseConfigService ],
    }),
    AdminModule,
    StudentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
