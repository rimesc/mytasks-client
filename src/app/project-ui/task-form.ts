import { Priority } from '../api/priority';

export class TaskForm {
  summary: string;
  description: string;
  priority: Priority = Priority.NORMAL;
  tags: string[];
}
