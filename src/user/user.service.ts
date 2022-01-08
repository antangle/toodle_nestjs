import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "src/entity/User";
import { CONNECTION_NAME } from "src/const/const";

@Injectable()
export class UserService{
    constructor(@InjectRepository(User, CONNECTION_NAME) private repository: Repository<User>){}

    async findAll(): Promise<User[]>{
        return await this.repository.find();
    }

}