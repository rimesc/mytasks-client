import { NgModule } from '@angular/core';

// angular modules
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

// feature modules
import { AppRoutingModule }   from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { LogoutModule } from './logout/logout.module';
import { ProjectsModule } from './projects/projects.module';
import { ServicesModule } from './services/services.module';
import { SharedModule } from './shared/shared.module';
import { TasksModule } from './tasks/tasks.module';

// components
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar.component';

@NgModule({
  imports: [
    // angular modules
    BrowserModule,
    HttpModule,
    // feature modules
    AppRoutingModule,
    AuthModule,
    CoreModule,
    DashboardModule,
    LogoutModule,
    ProjectsModule,
    ServicesModule,
    SharedModule,
    TasksModule
  ],
  declarations: [
    // components
    AppComponent,
    NavBarComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
