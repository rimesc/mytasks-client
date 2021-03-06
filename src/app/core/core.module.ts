import { NgModule } from '@angular/core';

// angular modules
import { CommonModule } from '@angular/common';

// external modules
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';

// services
import { ModalService } from './modal.service';
import { UnsavedChangesGuard } from './unsaved-changes-guard.service';

@NgModule({
  imports: [
    // angular modules
    CommonModule,
    // external modules
    Angular2FontawesomeModule,
    NgbModule.forRoot()
  ],
  declarations: [
  ],
  providers: [
    ModalService,
    UnsavedChangesGuard
  ],
  exports: [
  ]
})
export class CoreModule { }
