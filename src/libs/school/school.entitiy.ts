import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, ManyToOne } from 'typeorm'
import { News } from '../news/news.entitiy';
import { User } from '../user/user.entitiy';

@Entity()
export class School extends BaseEntity {

    @PrimaryGeneratedColumn({ comment: '고유번호' })
    id: number;

    @Column({ comment: '학교명' })
    name: string;

    @Column({ comment: '지역명' })
    location: string;

    @ManyToOne(type => User, user => user.id)
    user: User;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(type => News, news => news.school)
    news: News[];

}