import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let projects = [
      {id: 1, name: 'My first project', description: 'This is my first sample project.', numberOfOpenTasks: 3},
      {id: 2, name: 'My second project', description: 'This is my second sample project. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', numberOfOpenTasks: 2},
      {id: 3, name: 'My third project', description: 'This is my third sample project. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', numberOfOpenTasks: 0}
    ];
    return {projects};
  }
}
