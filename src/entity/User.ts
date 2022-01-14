import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from 'typeorm/index';

@Entity("user")
export class User {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column({
        unique: true
    })
    username!: string;

    @Column({
        unique: true
    })
    email!: string;

    @Column({
        type: 'varchar',
        length: 288
    })
    password!: string;

    @Column()
    nickname!: string;

    @CreateDateColumn()
    created_at?: Date;

    @UpdateDateColumn()
    updated_at?: Date;

    @Column({
        nullable: true
    })
    start_of_day?: string;

    @Column({
        nullable: true
    })
    end_of_day?: string;

    @Column({
        default: 0
    })
    terms_and_agreement?: number;
}