import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { config } from '../config/config';
//import { Db } from 'mongodb';

@Injectable()
export class AppService {
  //constructor() {} //@Inject(config.KEY) private configSerivice: ConfigType<typeof config>, //@Inject('MONGO') private MONGO: Db, //@Inject('TASKS') private TASKS: any[],

  getHello(): string {
    //const apiKey = this.configSerivice.apiKey;
    //const nameDB = this.configSerivice.database.name;
    return `La apiKey => ${'apiKey'}, el nameBD => ${'nameDB'}`;
  }

  //getTasksMongo() {
  //  const collec = this.MONGO.collection('TEST');
  //  return collec.find().toArray();
  //}
}
