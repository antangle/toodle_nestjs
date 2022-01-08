import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: "mariadb",
            name: "toodle1",
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            synchronize: true,
            logging: true,
            entities: [
                "/src/entity/**/*.ts"
            ],
            migrations: [
                "/src/migration/**/*.ts"
            ],
            subscribers: [
                "/src/subscriber/**/*.ts"
            ],
            cli: {
                "entitiesDir": "/src/entity",
                "migrationsDir": "/src/migration",
                "subscribersDir": "./src/subscriber"
            }
        })
    ]
})

export class MyTypeormModule{}