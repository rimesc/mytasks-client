import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { Task } from '../api/task';
import { TaskService } from '../services/task.service';
import { DEFAULT } from '../shared/task-filter';
import { routeParam } from '../util/routing-util';

@Injectable()
export class ProjectTasksResolver implements Resolve<Task> {

  constructor(private taskService: TaskService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Task[]> {
    let id = routeParam(route, 'projectId');
    return this.taskService.getFilteredTasks(id, DEFAULT.states);
  }

}
