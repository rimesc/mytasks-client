import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OnInit } from '@angular/core';

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

  constructor(private projectService: ProjectService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getProject();
  }

  getProject(): void {
    this.route.params.forEach((params: Params) => {
      let id = +params['id'];
      this.projectService.getProject(id).then(project => this.project = project);
    });
  }

}
