import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import {
  ParseObjectIdPipe2,
} from '../../../common/parse-object-idMongo.pipe';

@ApiTags('User Mongo')
@Controller('users2')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe2) id: string) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseObjectIdPipe2) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseObjectIdPipe2) id: string) {
    return this.usersService.remove(id);
  }
}
