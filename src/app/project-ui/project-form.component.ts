import { Component, Input, Output, EventEmitter } from '@angular/core';

import { ProjectSpec } from '../api/project-spec';

@Component({
  selector: 'project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent {
  @Input()
  action: string;

  @Input()
  project: ProjectSpec;

  @Output()
  submit = new EventEmitter<ProjectSpec>();

  @Output()
  cancel = new EventEmitter<void>();

  doSubmit(): void {
    this.submit.emit(this.project);
  }
}
