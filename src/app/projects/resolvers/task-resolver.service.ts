import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { ErrorHandlingResolver } from '../resolvers/error-handling-resolver';
import { Task } from '../../api/task';
import { TaskService } from '../../services/task.service';
import { routeParam } from '../../util/routing-util';

@Injectable()
export class TaskResolver extends ErrorHandlingResolver<Task> {

  constructor(private taskService: TaskService, private router: Router) {
    super();
  }

  doResolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Task> {
    let id = routeParam(route, 'taskId');
    return this.taskService.getTask(id);
  }

}
