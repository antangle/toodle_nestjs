import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Query, Req, UseGuards } from "@nestjs/common";
import { User } from "src/entity/User";
import { UserService } from "../provider/user.service";

@Controller('user')
export class UserController{
    constructor(
        private readonly service: UserService
    ){}

    @Get()
    async find(): Promise<any>{
        const password = await this.service.findOne("antangle");
        if(!password) throw new HttpException('no users', HttpStatus.NOT_FOUND);
        return password
    }


    @Patch()
    async updateUser(@Body('data') user: User): Promise<User> {
        const result = await this.service.updateUser(user);
        if(!result) throw new HttpException('update did not succeed', HttpStatus.NOT_FOUND);
        return result;
        
    }

    @Delete()
    async deleteUser(@Body('data') user: User): Promise<any> {
        const result = await this.service.deleteUser(user.username);
        if(!result) throw new HttpException('delete did not succeed', HttpStatus.NOT_FOUND);
        return result;
    }
}