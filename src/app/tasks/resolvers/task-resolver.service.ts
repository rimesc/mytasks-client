import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { Task } from '../../api/task';
import { TaskService } from '../../services/task.service';
import { routeParam } from '../../util/routing-util';

@Injectable()
export class TaskResolver implements Resolve<Task> {

  constructor(private taskService: TaskService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Task> {
    let id = routeParam(route, 'taskId');
    return this.taskService.getTask(id);
  }

}
