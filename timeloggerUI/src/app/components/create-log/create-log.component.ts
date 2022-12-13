import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Course } from 'src/app/models/course';
import { CourseService } from 'src/app/services/course.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-create-log',
  templateUrl: './create-log.component.html',
  styleUrls: ['./create-log.component.css']
})
export class CreateLogComponent implements OnInit {
  courses: Course[] = [];
  tasksList: Task[] = [];
  coursePicked: string ="";

  constructor(private courseService: CourseService, private taskService: TaskService) { }

  ngOnInit(): void {
    this.getCourses();
    this.getTasks();
  }

  getCourses()
  {
    this.courseService.getCourses().subscribe((result: Course[]) => (this.courses = result));
  }

  getTasks()
  {
    this.taskService.getTasks()
    .subscribe(
      x => {
        x.forEach(element => {
          this.tasksList.push(element);
        });
      }
    )
    console.log(this.tasksList);
  }

  insertLog(course: string)
  {
    console.log(course);
  }
}
