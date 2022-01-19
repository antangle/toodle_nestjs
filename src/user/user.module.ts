import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthService } from '../auth/auth.service';
import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/entity/User.entity";
import { CONNECTION_NAME } from "src/const/const";

@Module({
    imports: [
        TypeOrmModule.forFeature([User], CONNECTION_NAME),
    ],
    controllers: [UserController],
    providers: [
        UserService
    ],
    exports: [
        TypeOrmModule
    ]
})

export class UserModule{}