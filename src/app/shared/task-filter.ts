import { State } from '../api/state';

export const TaskFilters = {
  open: { label: 'Incomplete', states: [State.TO_DO, State.IN_PROGRESS, State.ON_HOLD] },
  closed: { label: 'Complete', states: [State.DONE] },
  all: { label: 'All tasks', states: [] }
};

export const DEFAULT_FILTER = 'open';

export class TaskFilter {
  label: string;
  states: State[];
}
