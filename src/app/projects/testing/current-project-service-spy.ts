import { Injectable } from '@angular/core';

import { Project } from '../../api/project';
import { ProjectForm } from '../../api/project-form';

@Injectable()
export class CurrentProjectServiceSpy {

  project: Project;

  update = jasmine.createSpy('update').and.callFake(
    (proj: ProjectForm) => Object.assign(this.project, proj)
  );

  delete = jasmine.createSpy('deleteProject').and.callFake(
    () => Promise.resolve()
  );

}
