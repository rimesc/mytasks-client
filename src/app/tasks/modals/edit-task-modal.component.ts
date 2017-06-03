import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { TaskForm } from '../../api/task-form';
import { ModalContent } from '../../core/modal-content';

@Component({
  selector: 'my-edit-task-modal',
  templateUrl: './edit-task-modal.component.html'
})
export class EditTaskModalComponent extends ModalContent<TaskForm> {
  constructor(activeModal: NgbActiveModal) {
    super(activeModal);
  }
}
