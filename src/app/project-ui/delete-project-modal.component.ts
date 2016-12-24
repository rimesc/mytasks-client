import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'my-delete-project-modal',
  templateUrl: './delete-project-modal.component.html'
})
export class DeleteProjectModalComponent {
  projectName: string;

  constructor(public activeModal: NgbActiveModal) { }

  submit(): void {
    this.activeModal.close();
  }

  cancel(): void {
    this.activeModal.dismiss();
  }
}
