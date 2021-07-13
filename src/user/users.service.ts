import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {User} from './user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {
    }

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    findOne(id: string): Promise<User> {
        return this.usersRepository.findOne(id, {relations: ['participates', 'events']});
    }

    async findByEmail(email: string) {
        return this.usersRepository.findOne({where: {email: email}})
    }

    async remove(id: string): Promise<void> {
        await this.usersRepository.delete(id);
    }

    create(param: { password: string; name: string; email: string }) {
        const data: Partial<User> = {
            name: param.name,
            email: param.email,
            password: param.password, // TODO: bcrypt
            api_token: param.password,
        };

        return this.usersRepository.save(data);
    }
}
