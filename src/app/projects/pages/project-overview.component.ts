import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { CurrentProjectService } from '../services/current-project.service';
import { ModalService } from '../../core/modal.service';
import { CanDeactivateComponent } from '../../core/unsaved-changes-guard.service';
import { DeleteProjectModalComponent } from '../modals/delete-project-modal.component';
import { EditProjectModalComponent } from '../modals/edit-project-modal.component';
import { NotesComponent } from '../../shared/components/notes.component';
import { Project } from '../../api/project';

@Component({
  selector: 'my-project-detail',
  templateUrl: './project-overview.component.html',
  styleUrls: ['./project-overview.component.scss']
})
export class ProjectOverviewComponent implements CanDeactivateComponent {

  @ViewChild(NotesComponent)
  private notesComponent: NotesComponent;

  constructor(private currentProject: CurrentProjectService,
              private modals: ModalService,
              private router: Router) { }

  canDeactivate(): Promise<boolean> {
    return this.notesComponent.tryCancel().then(() => true).catch(() => false);
  }

  get project(): Project {
    return this.currentProject.project;
  }

  set project(project: Project) {
    this.currentProject.project = project;
  }

  editProject(): void {
    this.modals.open(EditProjectModalComponent, { name: this.project.name, description: this.project.description })
      .then(project => this.currentProject.update(project))
      .catch(() => { });
  }

  deleteProject(): void {
    this.modals.open(DeleteProjectModalComponent)
      .then(() => this.currentProject.delete())
      .then(() => this.router.navigate(['projects']))
      .catch(() => {});
  }

  updateNotes(markdown: string): void {
    this.currentProject.updateNotes(markdown);
  }

}
