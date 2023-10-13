import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { School } from '../entitiy/school.entitiy';
import { CreateSchoolDto } from '../dto/create-school.dto';

@Injectable()
export class SchoolRepository extends Repository<School> {
    constructor(private dataSource: DataSource){
        super(School, dataSource.createEntityManager());
    }

    async createSchool(createSchoolDto: CreateSchoolDto): Promise<School> {
        const { name, location } = createSchoolDto;

        const school = this.create({
            name,
            location,
        });

        return await this.save(school);
    }
}