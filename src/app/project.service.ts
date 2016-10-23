import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Project } from './project';

@Injectable()
export class ProjectService {
  private url = 'app/projects';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  getProjects(): Promise<Project[]> {
    return this.http.get(this.url)
               .toPromise()
               .then(response => response.json().data as Project[])
               .catch(this.handleError);
  }

  getProject(id: number): Promise<Project> {
    return this.http.get(this.url + '/' + id)
               .toPromise()
               .then(response => response.json().data as Project)
               .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
