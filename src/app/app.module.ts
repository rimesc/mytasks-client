import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ApiModule } from './api/api.module';
import { ServicesModule } from './services/services.module';
import { AuthModule } from './auth/auth.module';
import { ProjectUiModule } from './project-ui/project-ui.module';
import { TaskUiModule } from './task-ui/task-ui.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar.component';
import { DashboardComponent } from './dashboard.component';
import { AppRoutingModule }   from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    ApiModule,
    ServicesModule,
    AuthModule,
    ProjectUiModule,
    TaskUiModule,
    SharedModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
