import {Status} from './status';
import {Priority} from './priority';

export interface Card {
  idCard?: string,
  title: string,
  description: string,
  startDate: Date,
  endDate: Date,
  status: Status,
  priority: Priority,
  idList: string
}
