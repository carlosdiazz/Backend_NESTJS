import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(
    @Inject('API_KEY') private API_KEY: string,
    @Inject('TASKS') private TASKS: any[],
  ) {}

  getHello(): string {
    console.log(this.TASKS);
    return `Hello World! ${this.API_KEY}`;
  }
}
