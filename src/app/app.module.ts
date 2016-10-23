import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api/in-memory-web-api.module';
import { InMemoryDataService }  from './in-memory-data.service';

import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar.component';
import { DashboardComponent } from './dashboard.component';
import { ProjectListComponent } from './project-list.component';
import { ProjectDetailComponent } from './project-detail.component';
import { TaskListComponent } from './task-list.component';
import { AppRoutingModule }   from './app-routing.module';
import { ProjectService } from './project.service';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    DashboardComponent,
    ProjectListComponent,
    ProjectDetailComponent,
    TaskListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    Angular2FontawesomeModule,
    AppRoutingModule
  ],
  providers: [ProjectService],
  bootstrap: [AppComponent]
})
export class AppModule { }
