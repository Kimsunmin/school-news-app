import { Unique, Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, DeleteDateColumn, ManyToOne } from 'typeorm'
import { User } from '../user/user.entitiy';
import { School } from '../school/school.entitiy';

@Entity()
@Unique(['school'])
export class Subscribe extends BaseEntity {

    @PrimaryGeneratedColumn({ comment: '고유번호' })
    id: number;

    @ManyToOne(type => User, user => user.id)
    user: User

    @ManyToOne(type => School, school => school.id, {eager: true})
    school: School

    @CreateDateColumn()
    createdAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}