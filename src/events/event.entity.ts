import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import {User} from "../user/user.entity";

@Entity('events')
export class Event {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @ManyToOne(() => User, user => user.events)
    @JoinColumn({
        name: 'user_id'
    })
    user: User;

    @ManyToMany(() => User)
    @JoinTable({
        name: 'event_user',
        joinColumn: {name: 'event_id'},
        inverseJoinColumn: {name: 'user_id'}
    })
    participants: User;

    @Column()
    starts_at: Date;

    @Column()
    ends_at: Date;

    @CreateDateColumn({type: 'timestamp', name: 'created_at'})
    created_at: Date;

    @UpdateDateColumn({type: 'timestamp'})
    updated_at: Date;
}
