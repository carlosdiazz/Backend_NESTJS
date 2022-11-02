import { IsNumber, IsNotEmpty, IsPositive } from 'class-validator';

import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateOrderItemDto {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly orderId: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly productId: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly quantity: number;
}

export class UpdateOrderDto extends PartialType(CreateOrderItemDto) {}
