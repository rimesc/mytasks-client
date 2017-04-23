import { Component, Input } from '@angular/core';

import { Project } from '../api/project';

@Component({
  // my-project-header would clash with the large header from the project detail page,
  // which will eventually be renamed or go away
  selector: 'my-mini-project-header',
  templateUrl: './project-header.component.html',
  styleUrls: ['./project-header.component.scss']
})
export class ProjectHeaderComponent {
  @Input()
  project: Project;
}
