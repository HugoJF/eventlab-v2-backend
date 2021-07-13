import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import {Exclude} from "class-transformer";
import {Event} from "../events/event.entity";

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

    // created events
    @OneToMany(() => Event, event => event.user)
    @JoinColumn({
        name: 'user_id'
    })
    events: Event[];

    @ManyToMany(() => Event)
    @JoinTable({
        name: 'event_user',
        joinColumn: {name: 'user_id'},
        inverseJoinColumn: {name: 'event_id'}
    })
    participates: Event;
}
