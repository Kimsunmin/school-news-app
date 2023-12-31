import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm'
import { UserRole } from '../enum/user-role.enum';

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn({ comment: '고유번호' })
    id: number;

    @Column({ comment: '학교명' })
    username: string;

    @Column({ comment: '지역명' })
    password: string;

    @Column({ comment: '유저 구분' })
    role: UserRole;

    @CreateDateColumn()
    createdAt: Date;

}