import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ModalContent } from '../../core/modal-content';

@Component({
  selector: 'my-delete-project-modal',
  templateUrl: './delete-project-modal.component.html'
})
export class DeleteProjectModalComponent extends ModalContent<void> {
  constructor(activeModal: NgbActiveModal) {
    super(activeModal);
  }
}
