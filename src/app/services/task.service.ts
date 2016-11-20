import { Injectable, Inject }    from '@angular/core';
import { Http } from '@angular/http';
import * as moment from 'moment/moment';

import 'rxjs/add/operator/toPromise';

import { API_BASE } from './service-constants';
import { ServiceUtil } from './service-util';
import { Task } from '../api/task';
import { Priority } from '../api/priority';
import { State } from '../api/state';

@Injectable()
export class TaskService extends ServiceUtil {

  constructor(@Inject(API_BASE) api: string, private http: Http) {
    super(api + 'tasks/');
  }

  getTasks(projectId: number): Promise<Task[]> {
    return this.http.get(this.url('', { project: projectId }))
               .toPromise()
               .then(response => response.json() as Task[])
               .catch(this.handleError);
  }

  getFilteredTasks(projectId: number, states: State[]): Promise<Task[]> {
    return this.http.get(this.url('', { project: projectId, state: states.map(s => State[s]) }))
               .toPromise()
               .then(response => response.json() as Task[])
               .catch(this.handleError);
  }

  createTask(project: number, summary: string, description: string, priority: Priority, tags: string[]): Promise<Task> {
    let now = moment();
    let task = { summary: summary, description: description,
                 priority: priority, state: State.TO_DO,
                 tags: tags,
                 created: moment(now).toDate(), updated: moment(now).toDate(),
                 project: project };
    return this.http.post(this.url(), JSON.stringify(task), {headers: this.headers})
               .toPromise()
               .then(response => response.json().data as Task)
               .catch(this.handleError);
  }

}
