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
  @ApiProperty()
  readonly description: string;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty()
  readonly image: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly price: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly stock: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly brandId: number;
}

//Aqui controlo el Upodate con un el mismo esquema de crear y estos parametros son opcionales
export class UpdateProductSchemas extends PartialType(CreateProductSchemas) {}
