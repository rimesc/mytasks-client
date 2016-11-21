import { Component, Output, EventEmitter } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { NewTaskModalComponent } from './new-task-modal.component';

import { TaskSpec } from '../api/task-spec';

@Component({
  selector: 'new-task-button',
  templateUrl: './new-task-button.component.html',
  styleUrls: ['./new-task-button.component.css']
})
export class NewTaskButtonComponent {
  @Output()
  submit = new EventEmitter<TaskSpec>();

  constructor(private modalService: NgbModal) { }

  openModal(): void {
    this.modalService.open(NewTaskModalComponent).result
      .then(task => this.submit.emit(task))
      .catch(() => {
        // cancelled
      });
  }

}
