import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { config } from '../config/config';

@Injectable()
export class AppService {
  constructor(
    @Inject('TASKS') private TASKS: any[],
    @Inject(config.KEY) private configSerivice: ConfigType<typeof config>,
  ) {}

  getHello(): string {
    const apiKey = this.configSerivice.apiKey;
    const nameDB = this.configSerivice.database.name;
    return `La apiKey => ${apiKey}, el nameBD => ${nameDB}`;
  }
}
