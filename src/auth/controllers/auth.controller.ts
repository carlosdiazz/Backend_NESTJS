import { Controller, Post, Req, Body, UseGuards, UseInterceptors, HttpCode } from '@nestjs/common';
import { SanitizeMongooseModelInterceptor } from 'nestjs-mongoose-exclude';
//import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { LoginAuth } from '../dto/auth.dto';
import {AuthService } from '../services/auth.service';
import { User} from '../../components/nosql/users/user.entity';
@Controller('auth')
@UseInterceptors(
    new SanitizeMongooseModelInterceptor({
      excludeMongooseId: false,
      excludeMongooseV: true,
    }),
  )
export class AuthController {

  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  @HttpCode(200)
  login(@Req() req: Request) {
    const user = req.user as User
    return this.authService.generateJWT(login)
  }
  
      //login(@Body() login: LoginAuth,) {
        //return login.user;
    //return { message: "Logueado" }
}
