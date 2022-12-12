import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseInformationComponent } from './components/course-information/course-information.component';
import { CreateLogComponent } from './components/create-log/create-log.component';
import { EditLogComponent } from './components/edit-log/edit-log.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { LoginComponent } from './components/login/login.component';
import { TimeloggerComponent } from './components/timelogger/timelogger.component';

const routes: Routes = [
  {
    path: '', component: LoginComponent
  },
  {
    path: 'courses', component: CourseInformationComponent
  },
  {
    path: 'timelogger', component: TimeloggerComponent
  },
  {
    path: 'tasks', component: TasksComponent
  },
  {
    path: 'editlog', component: EditLogComponent
  },
  {
    path: 'createlog', component: CreateLogComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
