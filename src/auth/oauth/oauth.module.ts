import { UtilModule } from '../../common/util/util.module';
import { JwtStrategy } from '../jwt/jwt.strategy';
import { AuthService } from '../auth.service';
import { MyConfigModule } from '../../config/envConfig.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../../user/user.module';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { OAuthController } from './oauth.controller';

@Module({
    imports: [
        UserModule,
        PassportModule,
        HttpModule,
        UtilModule,
        AuthModule
    ],
    providers: [AuthService, JwtStrategy],
    controllers: [OAuthController]
})

export class AuthModule{};