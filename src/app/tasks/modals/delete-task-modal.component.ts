import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'my-delete-task-modal',
  templateUrl: '../modals/delete-task-modal.component.html'
})
export class DeleteTaskModalComponent {
  projectName: string;

  constructor(public activeModal: NgbActiveModal) { }

  submit(): void {
    this.activeModal.close();
  }

  cancel(): void {
    this.activeModal.dismiss();
  }
}
