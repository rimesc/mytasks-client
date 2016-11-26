import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';
import { MomentModule } from 'angular2-moment';

import { ApiModule } from '../api/api.module';

import { MessagesComponent } from './messages.component';
import { MarkdownComponent } from './markdown.component';
import { EditNotesModalComponent } from './edit-notes-modal.component';
import { TagsComponent } from './tags.component';
import { EnumValuesPipe } from './enum-values.pipe';
import { TitleCasePipe } from './title-case.pipe';

@NgModule({
  declarations: [
    MessagesComponent,
    MarkdownComponent,
    EditNotesModalComponent,
    TagsComponent,
    EnumValuesPipe,
    TitleCasePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MomentModule,
    NgbModule,
    Angular2FontawesomeModule,
    MomentModule,
    ApiModule
  ],
  exports: [
    FormsModule,
    NgbModule,
    Angular2FontawesomeModule,
    MomentModule,
    ApiModule,
    MessagesComponent,
    MarkdownComponent,
    EditNotesModalComponent,
    TagsComponent,
    EnumValuesPipe,
    TitleCasePipe
  ],
  entryComponents: [EditNotesModalComponent]
})
export class SharedModule { }
