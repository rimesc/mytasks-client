import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api/in-memory-web-api.module';
import { InMemoryDataService }  from './in-memory-data.service';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ApiModule } from './api/api.module';
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
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    NgbModule.forRoot(),
    AppRoutingModule,
    ApiModule,
    ProjectUiModule,
    TaskUiModule,
    SharedModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
