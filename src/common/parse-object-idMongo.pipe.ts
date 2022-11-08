import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import mongoose from 'mongoose';
import { isMongoId } from 'class-validator';

@Injectable()
export class ParseObjectIdPipe
  implements PipeTransform<any, mongoose.Types.ObjectId>
{
  transform(value: any): mongoose.Types.ObjectId {
    const validObjectId: boolean = mongoose.isObjectIdOrHexString(value);
    if (!validObjectId) {
      throw new BadRequestException('Invalid ObjectId');
    }
    return value;
  }
}

@Injectable()
export class ParseObjectIdPipe2 implements PipeTransform {
  transform(value: string) {
    if (!isMongoId(value)) {
      throw new BadRequestException('Invalid ObjectId 2');
    }
    return value;
  }
}
