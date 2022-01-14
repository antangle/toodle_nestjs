import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InsertResult, QueryResult, Repository } from "typeorm";
import { User } from "src/entity/User";
import { CONNECTION_NAME } from "src/const/const";

@Injectable()
export class UserService{
    constructor(@InjectRepository(User, CONNECTION_NAME) private repository: Repository<User>){}

    async findAll(): Promise<User[]>{
        return await this.repository.find();
    }

    async findOne(username: string): Promise<Partial<User>>{
        const result: User = await this.repository.findOne({
            where: {
                username: username
            }
        });

        return result;
    }

    async create(user: User): Promise<User> {
        const result: InsertResult = await this.repository.createQueryBuilder()
            .insert()
            .into(User)
            .values(user)
            .returning('*')
            .execute();
        return {
            ...result.raw,
        }
    }

    async updateUser(user: User): Promise<any> {
        return this.repository.createQueryBuilder()
            .update(User)
            .set({
                nickname: user.nickname
            })
            .where({
                username: user.username
            })
            .returning(["id", "email"])
            .execute()
    }

    async deleteUser(username: string): Promise<any> {
        return this.repository.delete(username);
    }
}