import { User } from '../../entity/User.entity';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        //local strategy는 반드시 req에 username과 password에 상응하는 정보가 있어야함. Object내의 정보를 뽑아 쓰게 하는건 authenticate를 override해야할거같음.
        super({
            usernameField: "username",
            passwordField: "password"
        });
        this.name = "local"
    }

    async validate(username: string, password: string): Promise<any> {
        console.log("-------------", username);
        const userWithToken = await this.authService.validateUser(username, password);
        if (!userWithToken) {
            throw new UnauthorizedException();
        }
        return userWithToken;
    }
}