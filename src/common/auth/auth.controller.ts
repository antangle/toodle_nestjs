import { AuthService } from './auth.service';
import { User } from './../../entity/User';
import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller('auth')
export class AuthController{
    constructor(private readonly authService: AuthService){}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async createUser(@Body('data') user: User): Promise<any>{
        const token = this.authService.getJwtToken(user);        
        return {
            jwt_token: token
        }
    }
}