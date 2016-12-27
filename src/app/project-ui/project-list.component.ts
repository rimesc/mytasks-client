import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { ModalService } from '../shared/modal.service';
import { NewProjectModalComponent } from './new-project-modal.component';
import { Project } from '../api/project';
import { ProjectForm } from '../api/project-form';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'my-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: []
})
export class ProjectListComponent implements OnInit {
  projects: Project[];

  constructor(private projectService: ProjectService,
              private modals: ModalService) { }

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects(): void {
    this.projectService.getProjects().then(projects => this.projects = projects);
  }

  create(): void {
    this.modals.open<ProjectForm>(NewProjectModalComponent).then(project => this.createProject(project), () => {});
  }

  private createProject(project: ProjectForm): void {
    this.projectService.createProject(project).then(() => this.getProjects());
  }

  linkTo(id: number): string {
    return '/projects/' + id;
  }

}
