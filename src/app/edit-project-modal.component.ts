import { Component, Input } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ProjectForm } from './project-form';

@Component({
  selector: 'edit-project-modal',
  templateUrl: './edit-project-modal.component.html'
})
export class EditProjectModalComponent {
  project = new ProjectForm();

  constructor(public activeModal: NgbActiveModal) { }

  submit(project: ProjectForm): void {
    this.activeModal.close(project);
  }

  cancel(): void {
    this.activeModal.dismiss();
  }
}
