import { NgModule } from '@angular/core';

// feature modules
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';

// components
import { DashboardComponent } from './dashboard.component';

@NgModule({
  imports: [
    // feature modules
    DashboardRoutingModule,
    SharedModule
  ],
  declarations: [
    // components
    DashboardComponent,
  ]
})
export class DashboardModule { }
