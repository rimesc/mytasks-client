import { State } from '../api/state';

export const TaskFilters = {
  open: { label: 'Open tasks', states: [State.TO_DO, State.IN_PROGRESS, State.ON_HOLD] },
  closed: { label: 'Closed tasks', states: [State.DONE] },
  all: { label: 'All tasks', states: [] }
};

export const DEFAULT_FILTER = 'all';

export class TaskFilter {
  label: string;
  states: State[];
}
