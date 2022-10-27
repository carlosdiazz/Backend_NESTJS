import {
  Controller,
  Get,
  Delete,
  Put,
  Post,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserSchema, UpdateUserSchemas } from './users.schemas';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getAll() {
    return this.userService.findAll();
  }

  @Get(':idUser')
  getOne(@Param('idUser', ParseIntPipe) idUser: number) {
    return this.userService.findOne(idUser);
  }

  @Delete(':idUser')
  delete(@Param('idUser', ParseIntPipe) idUser: number) {
    return this.userService.delete(idUser);
  }

  @Put(':idUser')
  update(
    @Param('idUser', ParseIntPipe) idUser: number,
    @Body() payload: UpdateUserSchemas,
  ) {
    return this.userService.update(idUser, payload);
  }

  @Post()
  create(@Body() payload: CreateUserSchema) {
    return this.userService.create(payload);
  }
}
