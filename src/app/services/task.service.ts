import { Injectable, Inject }    from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { API_BASE } from './service-constants';
import { ServiceUtil } from './service-util';
import { Task } from '../api/task';
import { TaskSpec } from '../api/task-spec';
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
               .then(response => response.json().tasks.map(this.fromJson))
               .catch(this.handleError);
  }

  getFilteredTasks(projectId: number, states: State[]): Promise<Task[]> {
    return this.http.get(this.url('', { project: projectId, state: states.map(s => State[s]) }))
               .toPromise()
               .then(response => response.json().tasks.map(this.fromJson))
               .catch(this.handleError);
  }

  getTask(id: number): Promise<Task> {
    return this.http.get(this.url(id))
               .toPromise()
               .then(response => this.fromJson(response.json()))
               .catch(this.handleError);
  }

  createTask(task: TaskSpec): Promise<Task> {
    return this.http.post(this.url(), this.toJson(task), {headers: this.headers})
               .toPromise()
               .then(response => this.fromJson(response.json()))
               .catch(this.handleError);
  }

  private fromJson(json: any): Task {
    return {
      id: json.id as number,
      summary: json.summary as string,
      description: json.description as string,
      priority: Priority[json.priority as string],
      state: State[json.state as string],
      tags: json.tags as string[],
      created: json.created as Date,
      updated: json.updated as Date,
      project: json.project as number
    };
  }

  private toJson(task: TaskSpec): string {
    return JSON.stringify({
      summary: task.summary,
      description: task.description,
      priority: task.priority,
      tags: task.tags,
      project: task.project
    });
  }


}
