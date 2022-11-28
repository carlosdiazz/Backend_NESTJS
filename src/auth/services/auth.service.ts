import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { PayloadToken } from '../models/token.model';
import { UsersService } from '../../components/sql/users/users.service';
import { UsersService as UsersService2 } from '../../components/nosql/users/users.service';
import { User } from '../../components/nosql/users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private usersService2: UsersService2,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    //const user = await this.usersService.findByEmail(email);
    const user = await this.usersService2.findByEmail(email);
    const isMatch = await bcrypt.compare(password, user.password);
    if (user && isMatch) {
      const { password, ...rta } = user.toJSON();
      //return rta;
      return user;
    }
    return null;
  }

  generateJWT(user: User) {
    const payload: PayloadToken = { sub: user._id, role: user.role };
    return {
      acces_token: this.jwtService.sign(payload),
      user,
      //payload,
    };
  }
}
