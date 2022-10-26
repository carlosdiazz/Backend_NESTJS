import { Controller, Get, Delete, Put, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  getAll() {
    return { message: 'Get all Users' };
  }

  @Delete(':id')
  delete() {
    return { message: 'Delete Users' };
  }

  @Put(':id')
  update() {
    return { message: 'Update Users' };
  }

  @Post()
  create() {
    return { message: 'Create Users' };
  }
}
