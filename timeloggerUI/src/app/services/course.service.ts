import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../models/course';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CourseService {
  private url = "Course";
  courseID: number = 0;

  constructor(private http: HttpClient) { }

  public getCourses() : Observable<Course[]>
  {
    return this.http.get<Course[]>(`${environment.apiUrl}/${this.url}/GetCourses`);
  }

  public deleteCourse(id: number)
  {
    return this.http.delete(`${environment.apiUrl}/${this.url}/DeleteCourse/${id}`).subscribe();

  }

  public insertCourse(className: string)
  {
    return this.http.post<any>(`${environment.apiUrl}/${this.url}/CreateCourse/${className}`, {title: 'Create a course HTTP Post request'}).subscribe(
      data =>
      {
        this.courseID = data.id;
      }
    );
  }
}