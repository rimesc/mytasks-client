import { InMemoryDbService } from 'angular-in-memory-web-api';
import * as moment from 'moment/moment';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let now = moment();

    let projects = [
      {id: 1, name: 'My first project', description: 'This is my first sample project.', numberOfOpenTasks: 3},
      {id: 2, name: 'My second project', description: 'This is my second sample project. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', numberOfOpenTasks: 2},
      {id: 3, name: 'My third project', description: 'This is my third sample project. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', numberOfOpenTasks: 0}
    ];
    let tasks = [
      {id: 1,
       summary: 'First sample task',
       description: `
       # Lorem ipsum

       Lorem ipsum dolor sit amet, [consectetur adipiscing elit](http://www.example.com).
       Pellentesque a commodo nulla, feugiat mattis tortor.

       ## Duis et eleifend dui.

       Nunc id enim quis eros fermentum fermentum. Sed aliquam sodales tellus sed
       ultricies. In hac habitasse platea dictumst. Cras scelerisque sagittis tellus,
       nec hendrerit metus imperdiet nec. Vivamus quis neque ut tortor hendrerit
       tempor quis ac velit. Nullam ut lobortis nisi, sagittis mollis magna. Praesent
       risus nisi, auctor id semper nec, sagittis ac nisi. In non ipsum ut elit
       faucibus pellentesque sit amet in ex. Aliquam suscipit placerat neque sed
       porta.

       * Nulla eget sapien at justo pretium lobortis tincidunt quis sapien.
       * Mauris quis nisi in dolor porta volutpat.
       * Morbi ut mauris commodo, elementum lectus pharetra, malesuada sapien.
       * Ut quis urna mattis, placerat felis vitae, efficitur ipsum.
       * Aliquam rhoncus mauris eu eros pellentesque, vel elementum velit iaculis.
       * Maecenas varius erat nec`,
       priority: 'HIGH',
       state: 'TO_DO',
       created: moment(now).toDate(),
       updated: moment(now).toDate(),
       tags: ['Bug', 'Version 1'],
       project: 1},
      {id: 2,
       summary: 'Second sample task',
       description: 'This is the second sample task.',
       priority: 'CRITICAL',
       state: 'DONE',
       created: moment(now).subtract(1, 'week').toDate(),
       updated: moment(now).subtract(1, 'week').toDate(),
       tags: ['Feature'],
       project: 1},
      {id: 3,
       summary: 'Third sample task',
       description: 'This is the third sample task.',
       priority: 'LOW',
       state: 'TO_DO',
       created: moment(now).subtract(1, 'day').toDate(),
       updated: moment(now).subtract(15, 'minutes').toDate(),
       project: 1},
      {id: 4,
       summary: 'Fourth sample task',
       description: 'This is the fourth sample task.',
       priority: 'NORMAL',
       state: 'IN_PROGRESS',
       created: moment(now).subtract(1, 'year').toDate(),
       updated: moment(now).subtract(2, 'years').toDate(),
       project: 2},
      {id: 5,
       summary: 'Fifth sample task',
       description: 'This is the fifth sample task.',
       priority: 'HIGH',
       state: 'HIGH',
       created: moment(now).subtract(3, 'months').toDate(),
       updated: moment(now).subtract(3, 'months').toDate(),
       project: 3}
    ];
    return {projects, tasks};
  }
}
