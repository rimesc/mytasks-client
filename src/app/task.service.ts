import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Task } from './task';

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

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
