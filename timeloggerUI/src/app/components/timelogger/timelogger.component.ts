import { Component, OnInit } from '@angular/core';
import { Log } from 'src/app/models/log.model';
import { TimeloggerService } from 'src/app/services/timelogger.service';

@Component({
  selector: 'app-timelogger',
  templateUrl: './timelogger.component.html',
  styleUrls: ['./timelogger.component.css']
})
export class TimeloggerComponent implements OnInit {
  logs: Log[] = [];

  constructor(private timeloggerService: TimeloggerService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData()
  {
    this.timeloggerService.getLogs().subscribe((result: Log[]) => (this.logs = result.reverse()));
  }
}
