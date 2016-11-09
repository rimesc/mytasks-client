import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OnInit } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { EditProjectModalComponent } from './edit-project-modal.component'

import { Message } from './message';
import { Project } from './project';
import { ProjectService } from './project.service';

@Component({
  selector: 'project-view',
  templateUrl: './project-detail.component.html',
  styleUrls: []
})
export class ProjectDetailComponent implements OnInit {
  project: Project

  constructor(private projectService: ProjectService,
              private modalService: NgbModal,
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

  updateProject(project: Project): void {
    this.projectService.updateProject(project).then(project => this.project = project);
  }

  editProject(): void {
    let ref = this.modalService.open(EditProjectModalComponent);
    (ref.componentInstance as EditProjectModalComponent).name = this.project.name;
    (ref.componentInstance as EditProjectModalComponent).description = this.project.description;
    ref.result.then(project => {
      this.project.name = project.name;
      this.project.description = project.description;
      this.updateProject(this.project)
    }, () => {});
  }

  deleteProject(): void {
    console.log("Delete project.");
  }

  newTask(): void {
    console.log("New task.");
  }

}
