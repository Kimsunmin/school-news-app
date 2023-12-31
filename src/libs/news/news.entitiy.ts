import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne } from 'typeorm'
import { School } from '../school/school.entitiy';
import { User } from '../user/user.entitiy';

@Entity()
export class News extends BaseEntity {

    @PrimaryGeneratedColumn({ comment: '고유번호' })
    id: number;

    @Column({ comment: '소식 제목' })
    title: string;

    @Column({ comment: '소식 설명' })
    description: string;

    @ManyToOne(type => User, user => user.id)
    user: User;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToOne( type => School, school => school.news, { eager: false } )
    school: School

}