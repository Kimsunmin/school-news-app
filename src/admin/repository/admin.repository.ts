import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Admin } from '../entitiy/admin.entitiy';

@Injectable()
export class AdminRepository extends Repository<Admin> {
    constructor(private dataSource: DataSource){
        super(Admin, dataSource.createEntityManager());    
    }
}