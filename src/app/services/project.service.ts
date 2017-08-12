import { Injectable, Inject }    from '@angular/core';
import { Headers } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { API_BASE } from './service-constants';
import { ServiceUtil } from './service-util';
import { Project } from '../api/project';
import { ProjectForm } from '../api/project-form';
import { Notes } from '../api/notes';

@Injectable()
export class ProjectService extends ServiceUtil {

  constructor(@Inject(API_BASE) api: string, private http: AuthHttp) {
    super(api + 'projects/');
  }

  getProjects(): Promise<Project[]> {
    return this.http.get(this.url())
               .toPromise()
               .then(response => response.json() as Project[])
               .catch(this.handleError);
  }

  getProject(id: number): Promise<Project> {
    return this.http.get(this.url(id))
               .toPromise()
               .then(response => response.json() as Project)
               .catch(this.handleError);
  }

  createProject(project: ProjectForm): Promise<Project> {
    return this.http.post(this.url(), JSON.stringify(project), {headers: this.headers})
               .toPromise()
               .then(response => response.json() as Project)
               .catch(this.handleError);
  }

  updateProject(id: number, project: ProjectForm): Promise<Project> {
    return this.http.post(this.url(id), JSON.stringify(project), {headers: this.headers})
               .toPromise()
               .then(response => response.json() as Project)
               .catch(this.handleError);
  }

  updateNotes(id: number, raw: string): Promise<Notes> {
    return this.http.post(this.url(id + '/notes'), raw, {headers: new Headers({'Content-Type': 'text/markdown'})})
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
  }

  deleteProject(id: number): Promise<void> {
    return this.http.delete(this.url(id))
               .toPromise()
               .then(response => {})
               .catch(this.handleError);
  }

}
