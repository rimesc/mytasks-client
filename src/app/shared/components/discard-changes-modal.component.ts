import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ModalContent } from '../../core/modal-content';

@Component({
  selector: 'my-discard-changes-modal',
  templateUrl: './discard-changes-modal.component.html'
})
export class DiscardChangesModalComponent extends ModalContent<void> {
  constructor(activeModal: NgbActiveModal) {
    super(activeModal);
  }
}
