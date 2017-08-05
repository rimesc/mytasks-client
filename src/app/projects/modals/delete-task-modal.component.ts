import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ModalContent } from '../../core/modal-content';

@Component({
  selector: 'my-delete-task-modal',
  templateUrl: '../modals/delete-task-modal.component.html'
})
export class DeleteTaskModalComponent extends ModalContent<void> {
  constructor(activeModal: NgbActiveModal) {
    super(activeModal);
  }

  doSubmit(): void {
    this.submit(null);
  }
}
