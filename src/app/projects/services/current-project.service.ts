import { Injectable } from '@angular/core';
import { Project } from '../../api/project';
import { ProjectForm } from '../../api/project-form';
import { ProjectService } from '../../services/project.service';

/**
 * Service used by `ProjectsRootComponent` to share state with its child routes.
 */
@Injectable()
export class CurrentProjectService {

  /** The active project. */
  project: Project;

  constructor(private projectService: ProjectService) { }

  update(form: ProjectForm) {
    Object.assign(this.project, form);
    this.projectService.updateProject(this.project.id, form).then(project => this.project = project);
  }

  delete(): Promise<void> {
    return this.projectService.deleteProject(this.project.id).then(response => {});
  }

  updateNotes(markdown: string) {
    this.projectService.updateNotes(this.project.id, markdown).then(notes => this.project.notes = notes);
  }

}
