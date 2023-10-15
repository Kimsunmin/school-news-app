import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm'
import { News } from '../news/news.entitiy';

@Entity()
export class School extends BaseEntity {

    @PrimaryGeneratedColumn({ comment: '고유번호' })
    id: number;

    @Column({ comment: '학교명' })
    name: string;

    @Column({ comment: '지역명' })
    location: string;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(type => News, news => news.school)
    news: News[];

}