import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MyConfigModule } from './config/envConfig.module';
import { MyTypeormModule } from './config/typeorm.module';
import { UserModule } from './user/user.module';

@Module({
    imports: [
        MyConfigModule,
        MyTypeormModule,
        UserModule
    ],
    controllers: [AppController],
    providers: [AppService],
})

export class AppModule {}
