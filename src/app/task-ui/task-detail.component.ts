import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { OnInit } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Project } from '../api/project';
import { Task } from '../api/task';
import { Note } from '../api/note';
import { Priority } from '../api/priority';
import { State } from '../api/state';
import { ProjectService } from '../services/project.service';
import { TaskService } from '../services/task.service';

// TODO move these onto the API
const transitions: Transition[] = [
  { label: 'Start work', from: State.TO_DO, to: State.IN_PROGRESS },
  { label: 'Pause work', from: State.IN_PROGRESS, to: State.ON_HOLD },
  { label: 'Done', from: State.IN_PROGRESS, to: State.DONE },
  { label: 'Resume work', from: State.ON_HOLD, to: State.IN_PROGRESS }
];

@Component({
  selector: 'task-view',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {
  task: Task;
  project: Project;
  note: Note;
  priorities = Priority;
  states = State;

  constructor(private projectService: ProjectService,
              private taskService: TaskService,
              private modalService: NgbModal,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getTask();
  }

  getTask(): void {
    this.route.params.forEach((params: Params) => {
      let id = +params['id'];
      this.taskService.getTask(id).then(task => {
        this.task = task;
        this.getProject();
        this.getNotes();
      });
    });
  }

  getProject(): void {
    this.projectService.getProject(this.task.project).then(project => this.project = project);
  }

  getNotes(): void {
    this.taskService.getNotes(this.task.id).then(note => this.note = note);
  }

  availableTransitions(): Transition[] {
    return transitions.filter(t => t.from === this.task.state);
  }

}

interface Transition {
  label: string;
  from: State;
  to: State;
}