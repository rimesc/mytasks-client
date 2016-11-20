import { Priority } from './priority';

export class TaskSpec {
  summary: string;
  description: string;
  priority: Priority = Priority.NORMAL;
  tags: string[];
  project: number;
}
