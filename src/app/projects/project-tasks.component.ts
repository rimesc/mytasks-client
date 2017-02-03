import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Error } from '../api/error';
import { Message } from '../shared/message';
import { Project } from '../api/project';
import { Task } from '../api/task';
import { TaskForm } from '../api/task-form';
import { TaskService } from '../services/task.service';
import { TaskFilters, DEFAULT_FILTER } from '../shared/task-filter';

@Component({
  selector: 'my-project-tasks',
  templateUrl: './project-tasks.component.html',
  styleUrls: ['./project-tasks.component.css']
})
export class ProjectTasksComponent implements OnInit {
  project: Project;
  tasks: Task[];
  messages: Message[] = [];

  filters = TaskFilters;
  filterKeys = Object.getOwnPropertyNames(TaskFilters);
  activeFilter: string;

  constructor(private taskService: TaskService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(
      (data: { project: Project, tasks: Task[] }) => {
        this.project = data.project;
        this.tasks = data.tasks;
      },
      (error: Error) => this.messages.push({ code: error.code, detail: error.message, severity: 'danger'})
    );
    this.route.queryParams.map(params => params['filter'] || DEFAULT_FILTER).forEach(filter => this.setActiveFilter(filter));
  }

  setActiveFilter(filter: string): void {
    if (!!this.activeFilter) {
      // the resolver will take care of the initial load
      this.taskService.getFilteredTasks(this.project.id, TaskFilters[filter].states).subscribe(tasks => this.tasks = tasks);
    }
    this.activeFilter = filter;
  }

  applyFilter(filter: string): void {
    let queryParams = filter === DEFAULT_FILTER ? {} : {filter: filter};
    this.router.navigate(['.'], {relativeTo: this.route, queryParams: queryParams});
  }

  createTask(task: TaskForm): void {
    this.taskService.createTask(this.project.id, task).then(this.tasks.push);
  }

}

