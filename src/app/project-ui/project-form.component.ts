import { Component, Input, Output, EventEmitter } from '@angular/core';

import { ProjectForm } from '../api/project-form';

@Component({
  selector: 'my-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent {
  @Input()
  action: string;

  @Input()
  project: ProjectForm;

  @Output()
  submit = new EventEmitter<ProjectForm>();

  @Output()
  cancel = new EventEmitter<void>();

  doSubmit(): void {
    this.submit.emit(this.project);
  }
}
