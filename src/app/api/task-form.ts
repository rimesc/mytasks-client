import { Priority } from './priority';

export class TaskForm {
  summary: string;
  priority: Priority = Priority.NORMAL;
  tags: string[];
}

export function replace(key: string, value: any): any {
  switch (key) {
    case 'priority':
      return Priority[value as Priority];
    default:
      return value;
  }
}
