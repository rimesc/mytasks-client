import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { OnInit } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { DeleteProjectModalComponent } from './delete-project-modal.component';
import { EditProjectModalComponent } from './edit-project-modal.component';

import { Message } from '../shared/message';
import { Project } from '../api/project';
import { ProjectSpec } from '../api/project-spec';
import { TaskSpec } from '../api/task-spec';
import { ProjectService } from '../services/project.service';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'project-view',
  templateUrl: './project-detail.component.html',
  styleUrls: []
})
export class ProjectDetailComponent implements OnInit {
  project: Project

  constructor(private projectService: ProjectService,
              private taskService: TaskService,
              private modalService: NgbModal,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getProject();
  }

  getProject(): void {
    this.route.params.forEach((params: Params) => {
      let id = +params['id'];
      this.projectService.getProject(id).then(project => this.project = project);
    });
  }

  updateProject(project: ProjectSpec): void {
    this.projectService.updateProject(this.project.id, project).then(project => this.project = project);
  }

  editProject(): void {
    let ref = this.modalService.open(EditProjectModalComponent);
    (ref.componentInstance as EditProjectModalComponent).project = Object.assign({}, this.project);
    ref.result.then((project: ProjectSpec) => {
      this.project.name = project.name;
      this.project.description = project.description;
      this.updateProject(project);
    }, () => {});
  }

  deleteProject(): void {
    let ref = this.modalService.open(DeleteProjectModalComponent);
    (ref.componentInstance as DeleteProjectModalComponent).projectName = this.project.name;
    ref.result.then(() => this.projectService.deleteProject(this.project.id)).then(() => this.router.navigate(['projects']), () => {});
  }

  createTask(task: TaskSpec): void {
    task.project = this.project.id;
    this.taskService.createTask(task).then(() => this.getProject());
  }

}
