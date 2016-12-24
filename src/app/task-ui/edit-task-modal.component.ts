import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { TaskForm } from '../api/task-form';

@Component({
  selector: 'edit-task-modal',
  templateUrl: './edit-task-modal.component.html'
})
export class EditTaskModalComponent {
  task: TaskForm;

  constructor(public activeModal: NgbActiveModal) { }

  submit(task: TaskForm): void {
    this.activeModal.close(task);
  }

  cancel(): void {
    this.activeModal.dismiss();
  }
}
