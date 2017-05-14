import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { EditTaskModalComponent } from '../modals/edit-task-modal.component';
import { DeleteTaskModalComponent } from '../modals/delete-task-modal.component';

import { Error } from '../../api/error';
import { Message } from '../../shared/components/message';
import { Task } from '../../api/task';
import { TaskForm } from '../../api/task-form';
import { Priority } from '../../api/priority';
import { State } from '../../api/state';
import { TaskService } from '../../services/task.service';

// TODO move these onto the API
const transitions: Transition[] = [
  { label: 'Start work', from: State.TO_DO, to: State.IN_PROGRESS },
  { label: 'Pause work', from: State.IN_PROGRESS, to: State.ON_HOLD },
  { label: 'Done', from: State.IN_PROGRESS, to: State.DONE },
  { label: 'Resume work', from: State.ON_HOLD, to: State.IN_PROGRESS }
];

@Component({
  selector: 'my-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {
  task: Task;
  priorities = Priority;
  messages: Message[] = [];

  constructor(private taskService: TaskService,
              private modalService: NgbModal,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getTask();
  }

  getTask(): void {
    this.route.data.subscribe(
      (data: { task: Task }) => {
        this.task = data.task;
      },
      (error: Error) => this.messages.push({ code: error.code, detail: error.message, severity: 'danger'})
    );
  }

  updateTask(form: TaskForm): void {
    this.taskService.updateTask(this.task.id, form).then(task => this.task = task);
  }

  deleteTask(): void {
    let ref = this.modalService.open(DeleteTaskModalComponent);
    (ref.componentInstance as DeleteTaskModalComponent).projectName = this.task.project.name;
    ref.result
      .then(() => this.taskService.deleteTask(this.task.id))
      .then(() => this.router.navigate(['projects/' + this.task.project.id + '/tasks']), () => {});
  }

  editTask(): void {
    let ref = this.modalService.open(EditTaskModalComponent);
    (ref.componentInstance as EditTaskModalComponent).task = {
      summary: this.task.summary, priority: this.task.priority, tags: this.task.tags.slice(0)
    };
    ref.result.then((task: TaskForm) => {
      this.task.summary = task.summary;
      this.task.priority = task.priority;
      this.task.tags = task.tags;
      this.updateTask(task);
    }, () => {});
  }

  availableTransitions(): Transition[] {
    return transitions.filter(t => t.from === this.task.state);
  }

  performTransition(transition: Transition) {
    this.taskService.updateState(this.task.id, transition.to).then(task => this.task = task);
  }

  updateNotes(markdown: string): void {
    this.taskService.updateNotes(this.task.id, markdown).then(notes => this.task.notes = notes);
  }

}

interface Transition {
  label: string;
  from: State;
  to: State;
}
