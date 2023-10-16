import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { School } from './school.entitiy';
import { CreateSchoolDto } from '../dto/create-school.dto';
import { User } from '../user/user.entitiy';

@Injectable()
export class SchoolRepository extends Repository<School> {
    constructor(private dataSource: DataSource){
        super(School, dataSource.createEntityManager());
    }

    async createSchool(createSchoolDto: CreateSchoolDto, user: User): Promise<School> {
        const { name, location } = createSchoolDto;

        const school = this.create({
            name,
            location,
            user,
        });

        return await this.save(school);
    }

    async getSchoolById(schoolId: number): Promise<School> {
        const found = this.findOne({where: {id: schoolId}});

        if(!found){
            throw new NotFoundException(`Can't find school with id ${schoolId}`);
        }

        return found;
    }

}