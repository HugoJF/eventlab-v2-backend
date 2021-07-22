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
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column({nullable: true, default: null})
    email_verified_at: Date|null;

    @Column()
    @Exclude()
    password: string;

    @Column({nullable: true, default: null})
    api_token: string|null;

    @Column({nullable: true, default: null})
    two_factor_secret: string|null;

    @Column({nullable: true, default: null})
    two_factor_recovery_codes: string|null;

    @Column({nullable: true, default: null})
    remember_token: string|null;

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
