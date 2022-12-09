import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CourseInformationComponent } from './components/course-information/course-information.component';
import { TimeloggerComponent } from './components/timelogger/timelogger.component';
import { LoginComponent } from './components/login/login.component';
import { MatTable, MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    CourseInformationComponent,
    TimeloggerComponent,
    LoginComponent
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
