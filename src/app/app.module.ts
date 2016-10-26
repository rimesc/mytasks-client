import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api/in-memory-web-api.module';
import { InMemoryDataService }  from './in-memory-data.service';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar.component';
import { MessagesComponent } from './messages.component';
import { DashboardComponent } from './dashboard.component';
import { ProjectListComponent } from './project-list.component';
import { ProjectDetailComponent } from './project-detail.component';
import { ProjectHeaderComponent } from './project-header.component';
import { TaskListComponent } from './task-list.component';
import { NewProjectModalComponent } from './new-project-modal.component';
import { AppRoutingModule }   from './app-routing.module';
import { ProjectService } from './project.service';
import { TaskService } from './task.service';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    MessagesComponent,
    DashboardComponent,
    ProjectListComponent,
    ProjectDetailComponent,
    ProjectHeaderComponent,
    TaskListComponent,
    NewProjectModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    NgbModule.forRoot(),
    Angular2FontawesomeModule,
    AppRoutingModule
  ],
  providers: [ProjectService, TaskService],
  bootstrap: [AppComponent],
  entryComponents: [NewProjectModalComponent]
})
export class AppModule { }
