import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Log } from 'src/app/models/log.model';
import { TimeloggerService } from 'src/app/services/timelogger.service';
import { Course } from 'src/app/models/course';
import { CourseService } from 'src/app/services/course.service';
import { TaskService } from 'src/app/services/task.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-edit-log',
  templateUrl: './edit-log.component.html',
  styleUrls: ['./edit-log.component.css']
})

export class EditLogComponent implements OnInit {
  id: string | null = "";
  logs: Log[] = [];
  courses: Course[] = [];
  tasksList: Task[] = [];

  constructor(private taskService: TaskService, private courseService: CourseService, private route: ActivatedRoute, private timeloggerService: TimeloggerService, private router: Router) { }

  ngOnInit(): void {
    this.getCourses();
    this.id = this.route.snapshot.paramMap.get('id');
    this.getData(Number(this.id));
  }

  getData(idToDelete: number)
  {
    this.timeloggerService.getLogByID(idToDelete).subscribe((result: Log[]) => (this.logs = result.reverse()));
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

  updateLog()
  {
  }
}
