import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "src/entity/User";
import { Repository } from "typeorm";
import { UserService } from "./user.service";
import { CONNECTION_NAME } from "src/const/const";
// typeorm의 repository와 혼동될 수 있기에 함수형태로 mockRepository 작성

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const mockRepository = () => ({
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    create: jest.fn()
});

describe('UserService', () =>{
    let userService: UserService;
    let userRepository: MockRepository;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: getRepositoryToken(User, CONNECTION_NAME),
                    useValue: mockRepository()
                },
            ]
        }).compile();
        userService = module.get(UserService);
        userRepository = module.get(getRepositoryToken(User, CONNECTION_NAME))
    });

    it('be defined', () =>{
        expect(userService).toBeDefined();
    });

    it('when you search for multiple rows', async () => {
        const mockUser: User = {
            username: "antangle",
            email: "antangle@naver.com",
            nickname: "zanaris",
            password: "lawrence",
            terms_and_agreement: 0
        };
        const mockUser2: User = {
            username: "antangle2",
            email: "antangle2@naver.com",
            nickname: "zanaris2",
            password: "lawrence2",
            created_at: undefined,
            updated_at: undefined,
            terms_and_agreement: 1
        };
        
        userRepository.find.mockResolvedValueOnce([mockUser, mockUser2]);
        const result: User[] = await userService.findAll();
        expect(result).toEqual([mockUser, mockUser2]);
    });

    it('when you try findNicknameByUsername', async () => {
        const username = "antangle";
        const mockUser: User = {
            username: "antangle",
            email: "antangle@naver.com",
            nickname: "zanaris",
            password: "lawrence",
            terms_and_agreement: 0
        };
        userRepository.findOne.mockResolvedValueOnce(mockUser)
        const result: Partial<User> = await userService.findOne(username);
        expect(result.password).toEqual(mockUser.password);
    });

})