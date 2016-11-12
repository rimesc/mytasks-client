import { Priority } from '../api/priority';
import { State } from '../api/state';

export class Task {
  id: number;
  summary: string;
  description: string;
  priority: Priority;
  state: State;
  tags: string[];
  created: Date;
  updated: Date;
  project: number;
}
