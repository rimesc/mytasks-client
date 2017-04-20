import { NgModule } from '@angular/core';

// angular modules
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// external modules
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';

// components
import { MarkdownComponent } from './markdown.component';
import { MarkdownCardComponent } from './markdown-card.component';
import { EditNotesModalComponent } from './edit-notes-modal.component';

@NgModule({
  imports: [
    // angular modules
    CommonModule,
    FormsModule,
    // external modules
    Angular2FontawesomeModule,
    NgbModule,
  ],
  declarations: [
    // components
    EditNotesModalComponent,
    MarkdownComponent,
    MarkdownCardComponent
  ],
  exports: [
    // components
    MarkdownComponent,
    MarkdownCardComponent
  ],
  entryComponents: [
    // modal dialogs
    EditNotesModalComponent
  ]
})
export class MarkdownModule { }
