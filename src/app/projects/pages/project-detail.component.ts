import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';

import { ModalService } from '../../core/modal.service';
import { DeleteProjectModalComponent } from '../modals/delete-project-modal.component';
import { EditProjectModalComponent } from '../modals/edit-project-modal.component';

import { Error } from '../../api/error';
import { Message } from '../../shared/components/message';
import { Project } from '../../api/project';
import { ProjectForm } from '../../api/project-form';
import { TaskForm } from '../../api/task-form';
import { ProjectService } from '../../services/project.service';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'my-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  project: Project;
  messages: Message[] = [];

  constructor(private projectService: ProjectService,
              private taskService: TaskService,
              private modals: ModalService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(
      (data: { project: Project }) => {
        this.project = data.project;
      },
      (error: Error) => this.messages.push({ code: error.code, detail: error.message, severity: 'danger'})
    );
  }

  updateProject(form: ProjectForm): void {
    this.projectService.updateProject(this.project.id, form).then(project => this.project = project);
  }

  editProject(): void {
    this.modals.open(EditProjectModalComponent, { name: this.project.name, description: this.project.description })
      .then((project: ProjectForm) => {
        Object.assign(this.project, project);
        this.updateProject(project);
      })
      .catch(() => { });
  }

  deleteProject(): void {
    this.modals.open(DeleteProjectModalComponent)
      .then(() => this.projectService.deleteProject(this.project.id)).then(() => this.router.navigate(['projects']))
      .catch(() => {});
  }

  updateNotes(markdown: string): void {
    this.projectService.updateNotes(this.project.id, markdown).then(notes => this.project.notes = notes);
  }

  createTask(task: TaskForm): void {
    this.taskService.createTask(this.project.id, task).then(() => {
      this.project.tasks.total += 1;
      this.project.tasks.open += 1;
    });
  }

}
