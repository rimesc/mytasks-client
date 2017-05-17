import { NgModule } from '@angular/core';

// angular modules
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// external modules
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';
import { MarkdownModule } from 'angular2-markdown';

// components
import { MarkdownCardComponent } from './markdown-card.component';

@NgModule({
  imports: [
    // angular modules
    CommonModule,
    FormsModule,
    // external modules
    Angular2FontawesomeModule,
    NgbModule,
    MarkdownModule.forRoot()
  ],
  declarations: [
    // components
    MarkdownCardComponent
  ],
  exports: [
    // components
    MarkdownCardComponent
  ]
})
export class MarkdownNotesModule { }
