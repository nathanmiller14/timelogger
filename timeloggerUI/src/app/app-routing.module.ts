import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseInformationComponent } from './components/course-information/course-information.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path: '', component: LoginComponent
  },
  {
    path: 'courses', component: CourseInformationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
