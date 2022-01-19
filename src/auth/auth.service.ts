import { InsertResult } from 'typeorm';
import { CONNECTION_NAME } from 'src/const/const';
import { UserService } from './../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../entity/User.entity';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User, CONNECTION_NAME) private userRepository: Repository<User>,
        private jwtService: JwtService
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userRepository.findOne(username);
        //user가 존재하고 비밀번호 매칭 시.
        if (user && bcrypt.compare(pass, user.password)) {
            // result는 password 를 제외한 user의 모든 정보를 포함한다.
            const { password, ...result } = user;
            const token = await this.createJwtToken(user.username, user.id);
            
            return {
                ...result,
                jwtToken: token
            }
        }
        return null;
    }

    //jwt token 생성기.
    async createJwtToken(username: string, userId: number){
        const payload = {
            username: username,
            sub: userId,
        }
        const token = this.jwtService.sign(payload);    
        return token;
    }

    //
    async create(user: User): Promise<number> {
        const result: InsertResult = await this.userRepository.createQueryBuilder()
            .insert()
            .into(User)
            .values(user)
            .returning("id")
            .execute();
        return {
            ...result.raw
        }
    }
}