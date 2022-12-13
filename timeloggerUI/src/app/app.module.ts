import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CourseInformationComponent } from './components/course-information/course-information.component';
import { TimeloggerComponent } from './components/timelogger/timelogger.component';
import { LoginComponent } from './components/login/login.component';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TasksComponent } from './components/tasks/tasks.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EditLogComponent } from './components/edit-log/edit-log.component';
import { CreateLogComponent } from './components/create-log/create-log.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

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
    MatTableModule,
    MatToolbarModule,
    MatButtonModule,
    MatPaginatorModule,
    NgbModule,
    NgbPaginationModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [ MatTableModule, MatSelectModule, MatTable, MatToolbarModule, MatFormFieldModule, MatButtonModule, MatPaginatorModule, NgbPaginationModule ]
})
export class AppModule { }
