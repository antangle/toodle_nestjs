import { JwtService } from '@nestjs/jwt';
import { User } from './../../entity/User';
import { UserService } from './../../user/provider/user.service';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        if (user && bcrypt.compare(pass, user.password)) {
            const { password, ...result } = user;
            // result는 password 를 제외한 user의 모든 정보를 포함한다.
            return result;
        }
        return null;
    }

    async getJwtToken(user: User){
        const payload = {
            userId: user.id,
            username: user.username
        }
        return this.jwtService.sign(payload);    
    }
}