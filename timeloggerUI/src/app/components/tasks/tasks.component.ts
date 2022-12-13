import { Component, OnInit } from '@angular/core';
import { offset } from '@popperjs/core';
import { Observable, of } from 'rxjs';
import { TaskService } from 'src/app/services/task.service';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasksList: Task[] = [];
  reversedList: Task[] = [];
  showTextBox: boolean = false;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
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

  userAddingTask()
  {
    this.showTextBox = true;
  }

  userAddedTask()
  {
    this.showTextBox = false;
  }
}
