import {
  IsString,
  IsNotEmpty,
  IsPositive,
  IsOptional,
  IsEmail,
} from 'class-validator';

import { PartialType, ApiProperty } from '@nestjs/swagger'; //Lo apso por aqui apra la documentacion

export class CreateUserSchema {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'El firstName correcto' })
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly lastName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly nickname: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @IsEmail()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly password: string;

  @IsOptional()
  @IsPositive()
  @ApiProperty()
  readonly customerId: number;
}

export class UpdateUserSchemas extends PartialType(CreateUserSchema) {}
