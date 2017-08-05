import { NgModule } from '@angular/core';

// angular modules
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// external modules
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';
import { MomentModule } from 'angular2-moment';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RlTagInputModule } from 'angular2-tag-input';
import { MarkdownModule } from 'angular2-markdown';

// components
import { MessagesComponent } from './components/messages.component';
import { BadgeComponent } from './components/badge.component';
import { PriorityBadgeComponent } from './components/priority-badge.component';
import { StateBadgeComponent } from './components/state-badge.component';
import { TagComponent } from './components/tag.component';
import { TaskBadgesComponent } from './components/task-badges.component';
import { TaskFormComponent } from './components/task-form.component';
import { NotesComponent } from './components/notes.component';

// modals
import { DiscardChangesModalComponent } from './components/discard-changes-modal.component';

// pipes
import { EnumValuesPipe } from './pipes/enum-values.pipe';
import { TitleCasePipe } from './pipes/title-case.pipe';
import { PluralisePipe } from './pipes/pluralise.pipe';

@NgModule({
  imports: [
    // angular modules
    CommonModule,
    FormsModule,
    RouterModule,
    // external modules
    Angular2FontawesomeModule,
    MomentModule,
    NgbModule,
    RlTagInputModule,
    MarkdownModule.forRoot()
  ],
  declarations: [
    // components
    MessagesComponent,
    BadgeComponent,
    PriorityBadgeComponent,
    StateBadgeComponent,
    TagComponent,
    TaskBadgesComponent,
    TaskFormComponent,
    NotesComponent,
    // pipes
    EnumValuesPipe,
    TitleCasePipe,
    PluralisePipe,
    // modals
    DiscardChangesModalComponent
  ],
  entryComponents: [
    DiscardChangesModalComponent
  ],
  exports: [
    // angular modules
    CommonModule,
    FormsModule,
    // external modules
    NgbModule,
    Angular2FontawesomeModule,
    MomentModule,
    // components
    MessagesComponent,
    BadgeComponent,
    PriorityBadgeComponent,
    StateBadgeComponent,
    TagComponent,
    TaskBadgesComponent,
    TaskFormComponent,
    NotesComponent,
    // pipes
    EnumValuesPipe,
    TitleCasePipe,
    PluralisePipe
  ]
})
export class SharedModule { }
