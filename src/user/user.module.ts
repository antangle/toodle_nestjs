import { AuthService } from './../common/auth/auth.service';
import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/entity/User";
import { UserController } from "./controller/user.controller";
import { UserService } from "./provider/user.service";
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
        UserService
    ]
})

export class UserModule{}