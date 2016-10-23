import { Component, Input } from '@angular/core';

import { Project } from './project';

@Component({
  selector: 'project-header',
  templateUrl: './project-header.component.html',
  styleUrls: ['./project-header.component.css']
})
export class ProjectHeaderComponent {
  @Input()
  project: Project

  edit(): void {
    console.log("Edit project.");
  }

  delete(): void {
    console.log("Delete project.");
  }

  newTask(): void {
    console.log("New task.");
  }

}
