//import { IsDate, IsEmail } from 'class-validator';
import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
} from 'class-validator';
//import { PartialType } from '@nestjs/mapped-types';
import { PartialType, ApiProperty } from '@nestjs/swagger'; //Lo apso por aqui apra la documentacion

export class CreateProductSchemas {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'El name correcto' })
  readonly name: string;
  @IsString()
  @IsNotEmpty()
  readonly description: string;
  @IsUrl()
  @IsNotEmpty()
  readonly image: string;
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly price: number;
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly stock: number;
}

//Aqui controlo el Upodate con un el mismo esquema de crear y estos parametros son opcionales
export class UpdateProductSchemas extends PartialType(CreateProductSchemas) {}