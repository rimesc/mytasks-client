import { NgModule } from '@angular/core';

// angular modules
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// external modules
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';
import { MomentModule } from 'angular2-moment';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TagInputModule } from 'ng2-tag-input';

// feature modules
import { MarkdownModule } from '../markdown/markdown.module';

// components
import { MessagesComponent } from './messages.component';
import { StateBadgeComponent } from './state-badge.component';
import { TagsComponent } from './tags.component';
import { TaskFormComponent } from './task-form.component';

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
    TagInputModule,
    // feature modules
    MarkdownModule
  ],
  declarations: [
    // components
    MessagesComponent,
    StateBadgeComponent,
    TagsComponent,
    TaskFormComponent,
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
    StateBadgeComponent,
    TagsComponent,
    TaskFormComponent,
    // pipes
    EnumValuesPipe,
    TitleCasePipe,
    PluralisePipe
  ]
})
export class SharedModule { }
