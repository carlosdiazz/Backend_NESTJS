import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsUrl,
  IsPositive,
  IsOptional,
  Min,
  ValidateIf,
  IsEnum,
} from 'class-validator';

import { orderByProduct } from '../../../common/enum';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
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
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class FilterProductsDto {
  @IsOptional()
  @IsPositive()
  @ApiProperty({ required: false })
  readonly limit: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @ApiProperty({ required: false })
  readonly offset: number;

  @IsOptional()
  @Min(0)
  @ApiProperty({ required: false })
  readonly minPrice: number;

  @ValidateIf((params) => params.minPrice) // Solo si existe el minPrice esto es obligatorio
  @Min(0)
  @ApiProperty({ required: false })
  readonly maxPrice: number;

  @IsOptional()
  @ApiProperty({ enum: [orderByProduct.date, orderByProduct.price] })
  @IsEnum([orderByProduct.date, orderByProduct.price])
  readonly orderBy: string;

  @ValidateIf((item) => item.orderBy)
  @ApiProperty({ enum: [orderByProduct.ASC, orderByProduct.DES] })
  @IsEnum([orderByProduct.ASC, orderByProduct.DES])
  readonly order: string;
}
