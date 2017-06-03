import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ModalContent } from '../../core/modal-content';
import { TaskForm } from '../../api/task-form';

@Component({
  selector: 'my-new-task-modal',
  templateUrl: './new-task-modal.component.html',
})
export class NewTaskModalComponent extends ModalContent<TaskForm> {
  constructor(activeModal: NgbActiveModal) {
    super(activeModal);
    this.task = new TaskForm();
  }

  set task(task: TaskForm) {
    this.form = task;
  }

  get task() {
    return this.form;
  }
}
