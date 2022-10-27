import { IsString, IsEmail, IsAlphanumeric, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateUserSchema {
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;
  @IsString()
  @IsNotEmpty()
  readonly lastName: string;
  @IsString()
  @IsNotEmpty()
  readonly nickname: string;
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
  @IsAlphanumeric()
  @IsNotEmpty()
  readonly password: string;
}

export class UpdateUserSchemas extends PartialType(CreateUserSchema) {}
