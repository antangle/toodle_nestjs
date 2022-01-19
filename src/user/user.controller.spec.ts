import { UserService } from './user.service';
import { Controller } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "src/entity/User.entity";
import { Repository } from "typeorm";
import { UserController } from "./user.controller"
import { CONNECTION_NAME } from "src/const/const";

const mockRepository = () => ({
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    create: jest.fn()
});
type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('UserController', () =>{
    let userController: UserController;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: getRepositoryToken(User, CONNECTION_NAME),
                    useValue: mockRepository()
                },
            ],
            controllers: [UserController]
        }).compile();

        userController = module.get(UserController);
    });

    it('be defined', () =>{
        expect(userController).toBeDefined();
    });

});