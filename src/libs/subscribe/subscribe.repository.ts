import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
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

        try {
            const res = await this.save(subscribe);
            return res;
        } catch(err) {
            if(err.code === '23505'){
                throw new ConflictException(`Existing Subscribe`);
            } else {
                throw new InternalServerErrorException();
            }
        }        
    }

    // 구독한 페이지 목록 조회
    async getSubscribeByUser(user: User): Promise<Subscribe[]> {
        return await this.find({ where: {user: {id: user.id}}});
    }

    // 구독 취소
    async deleteSubscribe(subscribeId: number, user: User) {
        //const result = await this.softDelete(subscribeId);
        const result = await this.createQueryBuilder('subscribe').softDelete().where(
            'subscribe.id = :id and subscribe."userId" = :userId', {id: subscribeId, userId: user.id}
        ).execute();

        if(result.affected === 0) {
            throw new NotFoundException(`Can't not found id ${subscribeId}`);
        }

    }
}