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

// feature modules
import { MarkdownModule } from '../markdown/markdown.module';

// components
import { MessagesComponent } from './messages.component';
import { BadgeComponent } from './badge.component';
import { PriorityBadgeComponent } from './priority-badge.component';
import { StateBadgeComponent } from './state-badge.component';
import { TagComponent } from './tag.component';
import { TaskBadgesComponent } from './task-badges.component';
import { TaskFormComponent } from './task-form.component';
import { ProjectHeaderComponent } from './project-header.component';

// pipes
import { EnumValuesPipe } from './enum-values.pipe';
import { TitleCasePipe } from './title-case.pipe';
import { PluralisePipe } from './pluralise.pipe';

@NgModule({
  imports: [
    // angular modules
    CommonModule,
    FormsModule,
    RouterModule,
    // external modules
    Angular2FontawesomeModule,
    MarkdownModule,
    MomentModule,
    NgbModule,
    RlTagInputModule,
    // feature modules
    MarkdownModule
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
    ProjectHeaderComponent,
    // pipes
    EnumValuesPipe,
    TitleCasePipe,
    PluralisePipe
  ],
  exports: [
    // angular modules
    CommonModule,
    FormsModule,
    NgbModule,
    // external modules
    Angular2FontawesomeModule,
    MarkdownModule,
    MomentModule,
    // components
    MessagesComponent,
    BadgeComponent,
    PriorityBadgeComponent,
    StateBadgeComponent,
    TagComponent,
    TaskBadgesComponent,
    TaskFormComponent,
    ProjectHeaderComponent,
    // pipes
    EnumValuesPipe,
    TitleCasePipe,
    PluralisePipe
  ]
})
export class SharedModule { }
