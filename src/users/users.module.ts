import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserController } from './controllers/user.controller';
import { IsUserAlreadyExist } from './validators/is-user-already-exist.validator';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, IsUserAlreadyExist],
  controllers: [UserController],
  exports: [UsersService]
})
export class UsersModule {}
