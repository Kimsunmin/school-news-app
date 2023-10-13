import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Admin extends BaseEntity {

    @PrimaryGeneratedColumn({ comment: '고유번호' })
    id: number;

    @Column({ comment: '관리자 아이디' })
    username: string;

    @Column({ comment: '관리자 비밀번호' })
    password: string;

}