import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { DataBaseConfigModule } from './config/db/config.module';
import { DataBaseConfigService } from './config/db/config.service';
import { StudentModule } from './api/student/student.module';
import { AdminModule } from './api/admin/admin.module';
import { AuthModule } from './api/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ DataBaseConfigModule ],
      useClass: DataBaseConfigService,
      inject: [ DataBaseConfigService ],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`
    }),
    AdminModule,
    StudentModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
