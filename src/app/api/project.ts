import { Notes } from './notes';

export class Project {
  id: number;
  name: string;
  description?: string;
  tasks?: TaskStatistics;
  notes?: Notes;
}

class TaskStatistics {
  total: number;
  open: number;
  closed: number;
}
