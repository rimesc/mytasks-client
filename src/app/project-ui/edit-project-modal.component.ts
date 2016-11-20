import { Component, Input } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ProjectSpec } from '../api/project-spec';

@Component({
  selector: 'edit-project-modal',
  templateUrl: './edit-project-modal.component.html'
})
export class EditProjectModalComponent {
  project: ProjectSpec;

  constructor(public activeModal: NgbActiveModal) { }

  submit(project: ProjectSpec): void {
    this.activeModal.close(project);
  }

  cancel(): void {
    this.activeModal.dismiss();
  }
}
