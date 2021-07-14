import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {FindOneOptions, Repository} from 'typeorm';
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

    findOne(id: string, options?: FindOneOptions): Promise<User> {
        return this.usersRepository.findOne(id, options);
    }

    async findByEmail(email: string, extra?: FindOneOptions) {
        const options: FindOneOptions = {
            ...extra,
            where: {email}
        };

        return this.usersRepository.findOne(options);
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
