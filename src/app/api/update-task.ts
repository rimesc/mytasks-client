import { Priority } from './priority';
import { State } from './state';

export class UpdateTask {
  summary: string;
  description: string;
  priority: Priority;
  tags: string[];
}
