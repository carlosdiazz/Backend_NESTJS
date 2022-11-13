import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel} from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';

import { CreateUserDto, UpdateUserDto } from './user.dto';
import { User, userSchema} from './user.entity';


@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name) private userModel : Model<userSchema>,
  ) {}

  async create(data: CreateUserDto) {
    try {
      const newUser = new this.userModel(data);
      return await newUser.save();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findOne(id: string) : Promise<User>  {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('No se ecnontro este user')
    }
    return user;
  }

  async update(id: string, data: UpdateUserDto) {
    await this.findOne(id);
    return await this.userModel
      .findByIdAndUpdate(id, { $set: data }, { new: true })
      .exec();
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.userModel.findByIdAndDelete(id);
  }
}
