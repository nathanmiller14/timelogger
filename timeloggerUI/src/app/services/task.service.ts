import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private url = "Task";



  constructor(private http: HttpClient) { }

  public getTasks() : Observable<Task[]>
  {
    return this.http.get<Task[]>(`${environment.apiUrl}/${this.url}/GetTasks`);
  }

  // getTodos()
  // {
  //   return of(this.data.tasks);
  // }
}
