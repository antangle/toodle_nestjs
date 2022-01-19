import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { Repository } from "typeorm";
import { Test } from '@nestjs/testing';

// typeorm의 repository와 혼동될 수 있기에 함수형태로 mockRepository 작성
type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const mockRepository = () => ({
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    create: jest.fn()
});

describe('authController', () => {
    let authController: AuthController;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            imports: [
                UserModule, 
                JwtModule.register({
                    secret: "jwtsecret",
                    signOptions: {
                        expiresIn: '1h'
                    }            
                })
            ],
        })
    })
})