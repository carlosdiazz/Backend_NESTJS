import { Controller, Post, Req, Body, UseGuards, UseInterceptors, HttpCode } from '@nestjs/common';
import { SanitizeMongooseModelInterceptor } from 'nestjs-mongoose-exclude';
//import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { LoginAuth } from '../dto/auth.dto';

@Controller('auth')
@UseInterceptors(
    new SanitizeMongooseModelInterceptor({
      excludeMongooseId: false,
      excludeMongooseV: true,
    }),
  )
export class AuthController {

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  @HttpCode(200)
    //login(@Req() req: Request) {
    login(@Body() login: LoginAuth) {
        //return login.user;
        return {message:"Logueado"}
    }
}
