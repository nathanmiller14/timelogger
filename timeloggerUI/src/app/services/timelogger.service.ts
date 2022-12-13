import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../models/course';
import { environment } from 'src/environments/environment';
import { Log } from '../models/log.model';

@Injectable({
  providedIn: 'root'
})
export class TimeloggerService {
  private url = "Times";

  constructor(private http: HttpClient) { }

  public getLogs() : Observable<Log[]>
  {
    return this.http.get<Log[]>(`${environment.apiUrl}/${this.url}/GetLogs`);
  }

  public deleteLog(id: number)
  {
    return this.http.get(`${environment.apiUrl}/${this.url}/DeleteLog/${id}`);
  }

  public getLogByID(id: number)
  {
    return this.http.get<Log[]>(`${environment.apiUrl}/${this.url}/GetLogByID/${id}`);
  }
}
