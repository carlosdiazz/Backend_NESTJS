import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class ParseIntPipe2 implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    const val = Number(value);
    if (isNaN(val)) {
      throw new BadRequestException('Error popio esto no es un numero');
    }
    return val;
  }
}
