import { AuthModule } from 'src/common/auth/auth.module';
import { Module } from '@nestjs/common';
import { MyConfigModule } from './config/envConfig.module';
import { UserModule } from './user/user.module';
import { MyTypeormModule } from './config/typeorm.module';
@Module({
    imports: [
        MyConfigModule,
        MyTypeormModule,
        AuthModule,
        UserModule
    ],
    controllers: [],
    providers: [],
})

export class AppModule {}
