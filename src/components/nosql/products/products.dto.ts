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
  IsDate,
  ValidateNested,
  IsMongoId,
} from 'class-validator';

import { orderByProduct } from '../../../common/enum';
import { PartialType, ApiProperty } from '@nestjs/swagger';

import { CreateCategoryDto } from '../categories/categories.dto';

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

  @IsNotEmpty()
  @ValidateNested() //Aqui valido el objecto que se manda
  @ApiProperty()
  readonly category: CreateCategoryDto;

  @IsNotEmpty()
  @IsMongoId()
  readonly id_brand: string;
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
  @ApiProperty({ enum: [orderByProduct.ASC, orderByProduct.DESC] })
  @IsEnum([orderByProduct.ASC, orderByProduct.DESC])
  readonly order: string;

  @IsOptional()
  @IsDate()
  readonly initialDate: Date;

  @ValidateIf((item) => item.initialDate)
  @IsDate()
  readonly finalDate: Date;
}
