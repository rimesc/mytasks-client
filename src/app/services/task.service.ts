import { Injectable, Inject }    from '@angular/core';
import { Headers } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

import { API_BASE } from './service-constants';
import { ServiceUtil } from './service-util';
import { Task, revive } from '../api/task';
import { TaskForm, replace } from '../api/task-form';
import { State } from '../api/state';
import { Notes } from '../api/notes';

@Injectable()
export class TaskService extends ServiceUtil {

  constructor(@Inject(API_BASE) private api: string, private http: AuthHttp) {
    super(api + 'tasks/');
  }

  getTasks(projectId: number): Observable<Task[]> {
    return this.http.get(this.url('', { project: projectId }))
               .map(response => JSON.parse(response.text(), revive))
               .catch(this.handleError);
  }

  getFilteredTasks(projectId: number, states: State[]): Observable<Task[]> {
    return this.http.get(this.url('', { project: projectId, state: states.map(s => State[s]) }))
               .map(response => JSON.parse(response.text(), revive))
               .catch(this.handleError);
  }

  getTask(id: number): Promise<Task> {
    return this.http.get(this.url(id))
               .toPromise()
               .then(response => JSON.parse(response.text(), revive))
               .catch(this.handleError);
  }

  createTask(projectId: number, task: TaskForm): Promise<Task> {
    return this.http.post(this.api + 'projects/' + projectId + '/tasks/', JSON.stringify(task, replace), {headers: this.headers})
               .toPromise()
               .then(response => JSON.parse(response.text(), revive))
               .catch(this.handleError);
  }

  updateTask(id: number, task: TaskForm): Promise<Task> {
    return this.http.post(this.url(id), JSON.stringify(task, replace), {headers: this.headers})
               .toPromise()
               .then(response => JSON.parse(response.text(), revive))
               .catch(this.handleError);
  }

  deleteTask(id: number) {
    return this.http.delete(this.url(id))
               .toPromise()
               .catch(this.handleError);
  }

  updateState(id: number, state: State): Promise<Task> {
    return this.http.post(this.url(id), {state: state}, {headers: this.headers})
               .toPromise()
               .then(response => JSON.parse(response.text(), revive))
               .catch(this.handleError);
  }

  getNotes(id: number): Promise<Notes> {
    return this.http.get(this.url(id + '/notes'))
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
  }

  updateNotes(id: number, raw: string): Promise<Notes> {
    return this.http.post(this.url(id + '/notes'), raw, {headers: new Headers({'Content-Type': 'text/markdown'})})
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
  }

}
