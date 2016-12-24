import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Project } from '../api/project';
import { ProjectForm } from '../api/project-form';
import { ProjectService } from '../services/project.service';
import { NewProjectModalComponent } from './new-project-modal.component';

@Component({
  selector: 'my-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: []
})
export class ProjectListComponent implements OnInit {
  projects: Project[];

  constructor(private projectService: ProjectService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects(): void {
    this.projectService.getProjects().then(projects => this.projects = projects);
  }

  create(): void {
    this.modalService.open(NewProjectModalComponent).result.then(project => this.createProject(project), () => {});
  }

  private createProject(project: ProjectForm): void {
    this.projectService.createProject(project).then(() => this.getProjects());
  }

  linkTo(id: number): string {
    return '/projects/' + id;
  }

}
