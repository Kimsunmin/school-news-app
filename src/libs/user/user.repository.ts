import { Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { User } from './user.entitiy';
import { AuthUserDto } from '../dto/auth-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserRepository extends Repository<User> {
    constructor(private dataSource: DataSource){
        super(User, dataSource.createEntityManager());
    }

    async createUser(authUserDto: AuthUserDto): Promise<void> {
        const { username, password, role } = authUserDto;
        
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);

        const user: User = this.create({username, password: hashPassword, role});
        
        try {
            await this.save(user);
        } catch(err) {
            if(err.code === '23505'){
                throw new ConflictException(`Existing username`);
            } else {
                throw new InternalServerErrorException();
            }
        }

    }

}