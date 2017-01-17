import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Error } from '../api/error';
import { Message } from '../shared/message';
import { Project } from '../api/project';
import { Task } from '../api/task';
import { TaskForm } from '../api/task-form';
import { ProjectService } from '../services/project.service';
import { TaskService } from '../services/task.service';
import { TaskFilter, DEFAULT, OPEN, CLOSED, ALL } from '../shared/task-filter';

@Component({
  selector: 'my-project-tasks',
  templateUrl: './project-tasks.component.html',
  styleUrls: ['./project-tasks.component.css']
})
export class ProjectTasksComponent implements OnInit {
  project: Project;
  tasks: Task[];
  messages: Message[] = [];
  filters: TaskFilter[] = [ OPEN, CLOSED, ALL ];
  activeFilter: TaskFilter = DEFAULT;

  constructor(private projectService: ProjectService,
              private taskService: TaskService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(
      (data: { project: Project, tasks: Task[] }) => {
        this.project = data.project;
        this.tasks = data.tasks;
      },
      (error: Error) => this.messages.push({ code: error.code, detail: error.message, severity: 'danger'})
    );
  }

  activateFilter(filter: TaskFilter): void {
    this.activeFilter = filter;
    this.taskService.getFilteredTasks(this.project.id, this.activeFilter.states).subscribe(tasks => this.tasks = tasks);
  }

  createTask(task: TaskForm): void {
    this.taskService.createTask(this.project.id, task).then(this.tasks.push);
  }

}

