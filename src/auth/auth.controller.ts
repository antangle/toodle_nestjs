import { CustomParser } from './../common/util/parse';
import { UserService } from './../user/user.service';
import { AuthService } from './auth.service';
import { User } from '../entity/User.entity';
import { Body, Controller, Delete, Get, HttpException, HttpStatus, Post, Query, Render, Req, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { HttpService } from '@nestjs/axios';
import { KAKAO_STATE } from 'src/const/const';
import { lastValueFrom, map } from 'rxjs';
import { get } from 'http';
import axios from 'axios';

@Controller('auth')
export class AuthController{
    constructor(
        private readonly authService: AuthService, 
    ){}

    @Post('create')
    async create(@Body('data') user: User){
        const userId = await this.authService.create(user);
        if(!userId){
            //throw exception
        }

        const token = await this.authService.createJwtToken(user.username, userId);
        return {
            jwtToken: token,
        }
    }







    @UseGuards(AuthGuard('local'))
    @Post('login')
    async jwtTest(@Request() req): Promise<any>{
        return req.user;
    }
}