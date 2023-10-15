import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { User } from './user.entitiy';
import { AuthUserDto } from '../dto/auth-user.dto';

@Injectable()
export class UserRepository extends Repository<User> {
    constructor(private dataSource: DataSource){
        super(User, dataSource.createEntityManager());
    }

    async createUser(authUserDto: AuthUserDto) {
        
        const { username, password, job } = authUserDto;
        
        const user: User = this.create({username, password, job});
        await this.save(user);
    }

}