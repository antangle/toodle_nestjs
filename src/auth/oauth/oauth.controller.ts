import { CustomParser } from './../../common/util/parse';
import { lastValueFrom, map } from 'rxjs';
import { KAKAO_STATE } from './../../const/const';
import { Controller, Get, HttpException, HttpStatus, Query, Render } from "@nestjs/common";
import { HttpService } from '@nestjs/axios';

@Controller('oauth')
export class OAuthController{
    constructor(
        private readonly parser: CustomParser,
        private readonly httpService: HttpService,
    ){}

    @Get('kakao')
    @Render('index.ejs')
    async hello(){
        const client_id = process.env.KAKAO_API_KEY;
        const redirect_uri = 'http://localhost:3000/auth/kakao/request';
        const state = KAKAO_STATE;
        return {
            client_id, redirect_uri, state
        }   
    }
    
    @Get('kakao/request')
    async hi(@Query() query){
        const code = query.code;
        if(!code) throw new HttpException('code not found', HttpStatus.NOT_FOUND);
        
        const state = query.state;
        if(!state || state != KAKAO_STATE) throw new HttpException('wrong state', HttpStatus.BAD_REQUEST);
        
        if(query.error) throw new HttpException(query.error, HttpStatus.BAD_REQUEST);

        const url = 'https://kauth.kakao.com/oauth/token';

        const data = {
            grant_type: 'authorization_code',
            client_id: process.env.KAKAO_API_KEY,
            redirect_uri: 'http://localhost:3000/auth/kakao/request',
            code: code,
            client_secret: process.env.KAKAO_CLIENT_SECRET               
        }

        const parsedData = this.parser.parseData(data);

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }

        const res_tokens = await lastValueFrom(this.httpService.post(url, parsedData, config)
            .pipe(map(res => res.data))
        );
        
        if(!res_tokens) throw new HttpException('wrong state', HttpStatus.BAD_REQUEST);

        const res_id = await lastValueFrom(this.httpService.post(url, parsedData, config)
            .pipe(map(res => res.data))
        );

        return res_id
    }
}