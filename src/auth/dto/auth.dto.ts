import { IsString, IsNotEmpty } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger'; //Lo apso por aqui apra la documentacion

export class LoginAuth {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'El Email correcto' })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly password: string;
}
