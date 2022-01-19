import { JwtStrategy } from './jwt/jwt.strategy';
import { MyConfigModule } from '../config/envConfig.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [
        UserModule,
        PassportModule, 
        HttpModule,
        JwtModule.registerAsync({
            imports: [MyConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get('JWT_SECRET'),
                signOptions: {
                    expiresIn: configService.get('JWT_EXPIRATION_TIME')
                }            
            })
        })
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    controllers: [AuthController],
    exports: [
        JwtModule
    ]
})

export class AuthModule{};