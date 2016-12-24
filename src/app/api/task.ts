import { Project } from './project';
import { Priority } from './priority';
import { State } from './state';
import { Notes } from './notes';

export class Task {
  id: number;
  summary: string;
  priority: Priority;
  state: State;
  tags: string[];
  created: Date;
  updated?: Date;
  notes?: Notes;
  project: Project;
  href: string;
}

export function revive(key: string, value: any): any {
  switch (key) {
    case 'priority':
      return Priority[value as string];
    case 'state':
      return State[value as string];
    case 'created':
    case 'updated':
      return new Date(value as string);
    default:
      return value;
  }
}
