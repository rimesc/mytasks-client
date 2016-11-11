import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import * as moment from 'moment/moment';

import 'rxjs/add/operator/toPromise';

import { Task } from '../api/task';
import { Priority } from '../api/priority';
import { State } from '../api/state';

@Injectable()
export class TaskService {
  private url = 'app/tasks';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  getTasks(projectId: number): Promise<Task[]> {
    return this.http.get(this.url + '?project=' + projectId)
               .toPromise()
               .then(response => response.json().data as Task[])
               .catch(this.handleError);
  }

  getFilteredTasks(projectId: number, states: State[]): Promise<Task[]> {
    let baseUrl = this.url + '?project=' + projectId
    // TODO The real API will handle this in a single call. For now we have to
    // make multiple calls to the in-memory API and concatenate.
    let promises = states.map(state => this.http.get(baseUrl + '&state=' + state).toPromise().then(response => response.json().data as Task[]));
    return promises.reduceRight((p1, p2, i, arr) => p1.then(t1 => p2.then(t2 => t1.concat(t2))));
  }

  createTask(project: number, summary: string, description: string, priority: Priority): Promise<Task> {
    let now = moment();
    let task = { summary: summary, description: description,
                 priority: priority, state: State.TO_DO,
                 created: moment(now).toDate(), updated: moment(now).toDate(),
                 project: project };
    return this.http.post(this.url, JSON.stringify(task), {headers: this.headers})
               .toPromise()
               .then(response => response.json().data as Task)
               .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
