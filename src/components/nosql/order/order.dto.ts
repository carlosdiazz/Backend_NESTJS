import { IsString, IsNotEmpty, IsMongoId, IsArray, ArrayMinSize } from 'class-validator';
import { PartialType, ApiProperty, OmitType } from '@nestjs/swagger';

export class CreateOrderDto {

    @IsString()
    @IsNotEmpty()
    @IsMongoId()
    @ApiProperty()
    readonly id_costumer: string

    @IsArray()
    @ArrayMinSize(1)
    @ApiProperty()
    readonly products: string[];
}

export class UpdateOrderDto extends PartialType(
    OmitType(CreateOrderDto, ['products']) //Aqui estoy omitiendo este parametro
) {}
