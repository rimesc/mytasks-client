import { State } from '../api/state';

export const OPEN: TaskFilter = { id: 'OPEN', label: 'Open tasks', states: [State.TO_DO, State.IN_PROGRESS, State.ON_HOLD] };
export const CLOSED: TaskFilter = { id: 'CLOSED', label: 'Closed tasks', states: [State.DONE] };
export const ALL: TaskFilter = { id: 'ALL', label: 'All tasks', states: [] };

export const DEFAULT: TaskFilter = OPEN;

export class TaskFilter {
  id: string;
  label: string;
  states: State[];
}
