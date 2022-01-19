import { Column, PrimaryGeneratedColumn } from 'typeorm/index';
import { Entity } from "typeorm";

@Entity('auth')
export class Auth{

    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    token_code?: number;

    @Column({
        type: 'varchar',
        length: 2049
    })
    access_token?: string;    
}