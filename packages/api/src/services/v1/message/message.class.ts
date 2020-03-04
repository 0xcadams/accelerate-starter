import { MongooseServiceOptions, Service } from 'feathers-mongoose';
import { Application } from '../../../declarations';

export class Message extends Service {
  constructor(options: Partial<MongooseServiceOptions>, _app: Application) {
    super(options);
  }
}
