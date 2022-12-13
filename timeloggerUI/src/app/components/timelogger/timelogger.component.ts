import { Component, OnInit } from '@angular/core';
import { Log } from 'src/app/models/log.model';
import { TimeloggerService } from 'src/app/services/timelogger.service';
import { CreateLogComponent } from '../create-log/create-log.component';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource } from '@angular/material/table';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-timelogger',
  templateUrl: './timelogger.component.html',
  styleUrls: ['./timelogger.component.css']
})
export class TimeloggerComponent implements OnInit {
  logs: Log[] = [];
  page = 1;
  pageSize = 10;
  collectionSize = this.logs.length;

  constructor(private timeloggerService: TimeloggerService, private router: Router) { }

  ngOnInit(): void {
    this.getData();
  }

  getData()
  {
    this.timeloggerService.getLogs().subscribe((result: Log[]) => (this.logs = result.reverse()));
  }

  deleteById(id: number)
  {
    this.timeloggerService.deleteLog(id).subscribe();
  }
}