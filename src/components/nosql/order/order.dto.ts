import { IsString, IsNotEmpty, IsMongoId } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {

    @IsString()
    @IsNotEmpty()
    @IsMongoId()
    @ApiProperty()
    readonly id_costumer: string
}

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}
