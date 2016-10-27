import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Project } from './project';
import { Task } from './task';
import { ProjectService } from './project.service';
import { TaskService } from './task.service';

@Component({
  selector: 'project-tasks',
  templateUrl: './project-tasks.component.html',
  styleUrls: ['./project-tasks.component.css']
})
export class ProjectTasksComponent implements OnInit {
  project: Project
  tasks: Task[];
  filters: Filter[] = [
    {id: 'OPEN', label: 'Open tasks', states: ['TO_DO', 'IN_PROGRESS', 'ON_HOLD']},
    {id: 'CLOSED', label: 'Closed tasks', states: ['DONE']},
    {id: 'ALL', label: 'All tasks', states: []}
  ];
  activeFilter: Filter = this.filters[0];

  constructor(private projectService: ProjectService,
              private taskService: TaskService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getProject();
    this.getTasks();
  }

  getProject(): void {
    this.route.parent.params.forEach((params: Params) => {
      let id = +params['id'];
      this.projectService.getProject(id).then(project => this.project = project);
    });
  }

  getTasks(): void {
    this.route.parent.params.forEach((params: Params) => {
      let id = +params['id'];
      if (this.activeFilter.states.length > 0) {
        this.taskService.getFilteredTasks(id, this.activeFilter.states).then(tasks => this.tasks = tasks);
      }
      else {
        this.taskService.getTasks(id).then(tasks => this.tasks = tasks);
      }
    });
  }

  activateFilter(filter: Filter): void {
    this.activeFilter = filter;
    this.getTasks();
  }

  isModified(task: Task): boolean {
    return task.updated !== task.created;
  }

}

class Filter {
  id: string;
  label: string;
  states: string[];
}
