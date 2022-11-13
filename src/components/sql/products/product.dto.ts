//import { IsDate, IsEmail } from 'class-validator';
import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
  IsArray,
  ArrayMinSize,
  IsOptional,
  Min,
  ValidateIf,
  IsEnum,
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

  @IsArray()
  @ArrayMinSize(1)
  @IsNumber({}, { each: true })
  @ApiProperty()
  readonly categoryId: number[];
}

//Aqui controlo el Upodate con un el mismo esquema de crear y estos parametros son opcionales
export class UpdateProductSchemas extends PartialType(CreateProductSchemas) {}

export class FilterProductsDto {
  @IsOptional()
  //@IsNumber()
  @IsPositive()
  @ApiProperty()
  readonly limit: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @ApiProperty()
  readonly offset: number;

  @IsOptional()
  @IsPositive()
  @ApiProperty()
  readonly minPrice: number;

  @ValidateIf((item) => item.minPrice) //Si existe un minPrice, el maxprice debe de ser obligatorio
  @IsPositive()
  @ApiProperty()
  readonly maxPrice: number;

  @IsOptional()
  @ApiProperty({ enum: ['price', 'id'] })
  @IsEnum(['price', 'id'])
  readonly orderBy: string;

  @ValidateIf((item) => item.orderBy)
  @ApiProperty({ enum: ['ASC', 'DESC'] })
  @IsEnum(['ASC', 'DESC'])
  readonly order: string;
  //readonly brandId: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  readonly brandId: number;
}
