import { Injectable } from "@nestjs/common";
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DataBaseConfigService implements TypeOrmOptionsFactory {
    constructor(private configService: ConfigService) {}

    createTypeOrmOptions(): TypeOrmModuleOptions {
        console.log(__dirname);
        return {
            type: 'postgres',
            username: this.configService.get<string>('DB_USERNAME'),
            password: this.configService.get<string>('DB_PASSWORD'),
            port: this.configService.get<number>('DB_PORT'),
            host: this.configService.get<string>('DB_HOST'),
            database: this.configService.get<string>('DB_DATABASE'),
            entities: [ 
                `${__dirname}/../../libs/**/*.entitiy.{js, ts}`,
            ],
            synchronize: true,
        };
    }

}