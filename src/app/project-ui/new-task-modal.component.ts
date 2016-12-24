import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { TaskForm } from '../api/task-form';

@Component({
  selector: 'new-task-modal',
  templateUrl: './new-task-modal.component.html',
})
export class NewTaskModalComponent {
  task = new TaskForm();

  constructor(public activeModal: NgbActiveModal) { }

  submit(task: TaskForm): void {
    this.activeModal.close(task);
  }

  cancel(): void {
    this.activeModal.dismiss();
  }
}
