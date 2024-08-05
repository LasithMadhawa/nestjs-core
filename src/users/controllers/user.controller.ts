import { Body, Controller, Get, Post, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { UsersService } from '../users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UsersService) {}

    @Public()
    @Post('create')
    async create(@Body() createUser: CreateUserDto,) {
        return this.userService.create(createUser);
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    async me(@Request() req: any) {
        let userId = req.user.userId;
        // if userId is null or undefined, the db returns the first row of the table.
        // better to return an unauthorized exception when the userId in the token payload is null or undefined
        if (!userId) {
            throw new UnauthorizedException();
        }
        return this.userService.findOne({ where: {id: userId}});
    }
}
