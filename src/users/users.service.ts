import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
      ) {}
    
      async create(data: Partial<User>): Promise<User> {
        const user = this.userRepository.create(data);
    
        return this.userRepository.save(user);
      }
    
      async findOne(where: FindOneOptions<User>): Promise<User> {
        const user = await this.userRepository.findOne(where);
    
        if (!user) {
          throw new NotFoundException(
            `There isn't any user with identifier: ${where}`,
          );
        }
    
        return user;
      }
    
      async update(id: number, updates: UpdateUserDto): Promise<User> {
        const user = await this.userRepository.findOneBy({ id });
    
        if (!user) {
          throw new NotFoundException(`There isn't any user with id: ${id}`);
        }
    
        this.userRepository.merge(user, updates);
    
        return this.userRepository.save(user);
      }
}
