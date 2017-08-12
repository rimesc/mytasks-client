import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { ErrorHandlingResolver } from '../resolvers/error-handling-resolver';
import { Project } from '../../api/project';
import { ProjectService } from '../../services/project.service';
import { routeParam } from '../../util/routing-util';

@Injectable()
export class ProjectDetailResolver extends ErrorHandlingResolver<Project> {

  constructor(private projectService: ProjectService, private router: Router) {
    super();
  }

  doResolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Project> {
    let id = routeParam(route, 'projectId');
    return this.projectService.getProject(id);
  }

}
