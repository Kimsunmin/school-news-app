import { Injectable, NotFoundException } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Subscribe } from "./subscribe.entitiy";
import { User } from "../user/user.entitiy";
import { School } from "../school/school.entitiy";

@Injectable()
export class SubscribeRepository extends Repository<Subscribe> {
    constructor(private dataSource: DataSource) {
        super(Subscribe, dataSource.createEntityManager());
    }

    // 학교 페이지 구독
    async createSubscribe(user: User, school: School): Promise<Subscribe> {
        const subscribe = this.create({
            user,
            school
        });
        return await this.save(subscribe);
    }

    // 구독한 페이지 목록 조회
    async getSubscribeByUser(user: User): Promise<Subscribe[]> {
        return await this.find({ where: {user: {id: user.id}}});
    }

    // 구독 취소
    async deleteSubscribe(subscribeId: number) {
        const result = await this.softDelete(subscribeId);

        if(result.affected === 0) {
            throw new NotFoundException(`Can't not found id ${subscribeId}`);
        }

    }
}