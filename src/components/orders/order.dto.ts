import { IsNumber, IsNotEmpty, IsPositive } from 'class-validator';

import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly customerId: number;
}

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}
