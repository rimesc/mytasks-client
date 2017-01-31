import { NgModule } from '@angular/core';

// feature modules
import { SharedModule } from '../shared/shared.module';

// components
import { LogoutComponent } from './logout.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    LogoutComponent
  ],
  exports: [
    LogoutComponent
  ]
})
export class LogoutModule { }
