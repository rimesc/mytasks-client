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

  createProject(name: string, description: string) {
    // TODO we shouldn't need to set numberOfOpenTasks with the real API, but it helps for the in-memory one
    return this.http.post(this.url, JSON.stringify({name: name, description: description, numberOfOpenTasks: 0}), {headers: this.headers})
               .toPromise()
               .then(response => response.json().data as Project)
               .catch(this.handleError);
  }

  updateProject(project: Project) {
    // TODO the real API will return the updated project as the response body, but the in-memory one doesn't
    return this.http.put(this.url + '/' + project.id, JSON.stringify(project), {headers: this.headers})
               .toPromise()
               .then(response => project)
               .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
