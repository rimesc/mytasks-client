import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { CurrentProjectService } from '../services/current-project.service';
import { MessagesService } from '../services/messages.service';
import { Error } from '../../api/error';
import { Project } from '../../api/project';
import { Task, compareByLastModified } from '../../api/task';
import { TaskForm } from '../../api/task-form';
import { TaskService } from '../../services/task.service';
import { TaskFilters, DEFAULT_FILTER } from '../../shared/task-filter';

@Component({
  selector: 'my-project-tasks',
  templateUrl: './project-tasks.component.html',
  styleUrls: ['./project-tasks.component.css']
})
export class ProjectTasksComponent implements OnInit {
  _tasks: Task[];

  filters = TaskFilters;
  filterKeys = Object.getOwnPropertyNames(TaskFilters);
  activeFilter: string;

  constructor(private taskService: TaskService,
              private router: Router,
              private route: ActivatedRoute,
              private currentProject: CurrentProjectService,
              private messages: MessagesService) { }

  ngOnInit(): void {
    this.route.data.subscribe(
      (data: { tasks: Task[] }) => {
        this.tasks = data.tasks;
      },
      (error: Error) => this.messages.error(error.code, error.message)
    );
    this.route.queryParams.map(params => params['filter'] || DEFAULT_FILTER).forEach(filter => this.setActiveFilter(filter));
  }

  get project(): Project {
    return this.currentProject.project;
  }

  set tasks(tasks: Task[]) {
    this._tasks = tasks.sort(compareByLastModified);
  }

  get tasks() {
    return this._tasks.slice().reverse();
  }

  setActiveFilter(filter: string): void {
    if (!!this.activeFilter) {
      // the resolver will take care of the initial load
      this.taskService.getFilteredTasks(this.project.id, TaskFilters[filter].states).subscribe(tasks => this.tasks = tasks);
    }
    this.activeFilter = filter;
  }

  createTask(task: TaskForm): void {
    this.taskService.createTask(this.project.id, task).then(t => this._tasks.push(t));
  }

}

