import { Controller, Get } from "@nestjs/common";
import { User } from "src/entity/User";
import { UserService } from "./user.service";

@Controller()
export class UserController{
    constructor(private readonly service: UserService){}

    @Get('test')
    findAll(): Promise<User[]>{
        return this.service.findAll();
    }

}