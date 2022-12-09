import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { Course } from 'src/app/models/course';
import { CourseService } from 'src/app/services/course.service';



@Component({
  selector: 'app-course-information',
  templateUrl: './course-information.component.html',
  styleUrls: ['./course-information.component.css']
})
export class CourseInformationComponent implements OnInit {
  courses: Course[] = [];
  addingCourse: boolean = false;
  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.getData();
  }

  addCourse()
  {
    this.addingCourse = true;
  }

  getData()
  {
    this.courseService.getCourses().subscribe((result: Course[]) => (this.courses = result));
  }

  removeCourse(idToDelete: any)
  {
    console.log(idToDelete);
    this.courseService.deleteCourse(idToDelete);
  }

  insertCourse(courseName: string)
  {
    this.courseService.insertCourse(courseName);
  }
}
