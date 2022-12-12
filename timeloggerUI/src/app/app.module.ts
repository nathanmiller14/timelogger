import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CourseInformationComponent } from './components/course-information/course-information.component';
import { TimeloggerComponent } from './components/timelogger/timelogger.component';
import { LoginComponent } from './components/login/login.component';
import { MatTable, MatTableModule } from '@angular/material/table';
import { TasksComponent } from './components/tasks/tasks.component';
import { EditLogComponent } from './components/edit-log/edit-log.component';
import { CreateLogComponent } from './components/create-log/create-log.component';

@NgModule({
  declarations: [
    AppComponent,
    CourseInformationComponent,
    TimeloggerComponent,
    LoginComponent,
    TasksComponent,
    EditLogComponent,
    CreateLogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [ MatTableModule, MatTable ]
})
export class AppModule { }
