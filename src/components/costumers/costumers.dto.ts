import { IsString, IsNotEmpty } from 'class-validator';

import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateCostumersSchemas {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly lastName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly phone: string;
}

//Aqui controlo el Upodate con un el mismo esquema de crear y estos parametros son opcionales
export class UpdateCostumersSchemas extends PartialType(
  CreateCostumersSchemas,
) {}
