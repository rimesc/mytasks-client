import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { Project } from '../../api/project';
import { ProjectService } from '../../services/project.service';
import { routeParam } from '../../util/routing-util';

@Injectable()
export class ProjectDetailResolver implements Resolve<Project> {

  constructor(private projectService: ProjectService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Project> {
    let id = routeParam(route, 'projectId');
    return this.projectService.getProject(id);
  }

}
