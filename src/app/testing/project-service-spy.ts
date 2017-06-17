import { Injectable } from '@angular/core';

@Injectable()
export class ProjectServiceSpy {
  getProjects = jasmine.createSpy('getProjects');
  createProject = jasmine.createSpy('createProject');
}
