import { Injectable, Inject }    from '@angular/core';
import { AuthHttp } from 'angular2-jwt';

import 'rxjs/add/operator/toPromise';

import { API_BASE } from './service-constants';
import { ServiceUtil } from './service-util';
import { Project } from '../api/project';
import { ProjectSpec } from '../api/project-spec';

@Injectable()
export class ProjectService extends ServiceUtil {

  constructor(@Inject(API_BASE) api: string, private http: AuthHttp) {
    super(api + 'projects/');
  }

  getProjects(): Promise<Project[]> {
    return this.http.get(this.url())
               .toPromise()
               .then(response => response.json().projects as Project[])
               .catch(this.handleError);
  }

  getProject(id: number): Promise<Project> {
    return this.http.get(this.url(id))
               .toPromise()
               .then(response => response.json() as Project )
               .catch(this.handleError);
  }

  createProject(project: ProjectSpec): Promise<Project> {
    return this.http.post(this.url(), this.toJson(project), {headers: this.headers})
               .toPromise()
               .then(response => response.json() as Project)
               .catch(this.handleError);
  }

  updateProject(id: number, project: ProjectSpec) {
    return this.http.post(this.url(id), this.toJson(project), {headers: this.headers})
               .toPromise()
               .then(response => response.json() as Project)
               .catch(this.handleError);
  }

  deleteProject(id: number) {
    return this.http.delete(this.url(id))
               .toPromise()
               .catch(this.handleError);
  }

  private toJson(project: ProjectSpec): string {
    return JSON.stringify({
      name: project.name,
      description: project.description
    });
  }

}
