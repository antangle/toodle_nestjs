import { JwtStrategy } from './jwt.strategy';
import { MyConfigModule } from './../../config/envConfig.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserModule } from './../../user/user.module';
import { Module } from '@nestjs/common';

@Module({
    imports: [
        MyConfigModule,
        UserModule, 
        PassportModule, 
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: {
                expiresIn: '1h'
            }            
        })
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    controllers: [AuthController]
})

export class AuthModule{};