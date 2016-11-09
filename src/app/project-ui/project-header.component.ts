import { Component, Input } from '@angular/core';

import { Project } from '../api/project';

@Component({
  selector: 'project-header',
  templateUrl: './project-header.component.html',
  styleUrls: ['./project-header.component.css']
})
export class ProjectHeaderComponent {
  @Input()
  project: Project
}
