import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import {Exclude} from "class-transformer";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    email_verified_at: Date;

    @Column()
    @Exclude()
    password: string;

    @Column()
    api_token: string;

    @Column()
    two_factor_secret: string;

    @Column()
    two_factor_recovery_codes: string;

    @Column()
    remember_token: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
