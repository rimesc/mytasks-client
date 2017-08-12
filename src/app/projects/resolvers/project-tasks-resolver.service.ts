import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { ErrorHandlingResolver } from '../resolvers/error-handling-resolver';
import { Task } from '../../api/task';
import { TaskService } from '../../services/task.service';
import { TaskFilters, DEFAULT_FILTER } from '../../shared/task-filter';
import { routeParam } from '../../util/routing-util';

@Injectable()
export class ProjectTasksResolver extends ErrorHandlingResolver<Task[]> {

  constructor(private taskService: TaskService, private router: Router) {
    super();
  }

  doResolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Task[]> {
    let id = routeParam(route, 'projectId');
    let filter = route.queryParams['filter'] || DEFAULT_FILTER;
    return this.taskService.getFilteredTasks(id, TaskFilters[filter].states);
  }

}
