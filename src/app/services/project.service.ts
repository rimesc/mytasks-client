import { Injectable, Inject }    from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { API_BASE } from './service-constants';
import { ServiceUtil } from './service-util';
import { Project } from '../api/project';

@Injectable()
export class ProjectService extends ServiceUtil {

  constructor(@Inject(API_BASE) api: string, private http: Http) {
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

  createProject(name: string, description: string): Promise<Project> {
    return this.http.post(this.url(), JSON.stringify({name: name, description: description}), {headers: this.headers})
               .toPromise()
               .then(response => response.json() as Project)
               .catch(this.handleError);
  }

  updateProject(project: Project) {
    return this.http.put(this.url(project.id), JSON.stringify(project), {headers: this.headers})
               .toPromise()
               .then(response => response.json() as Project)
               .catch(this.handleError);
  }

  deleteProject(id: number) {
    return this.http.delete(this.url(id))
               .toPromise()
               .catch(this.handleError);
  }

}
