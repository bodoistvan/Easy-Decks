import { Component, Input, OnInit } from '@angular/core';
import { Report } from 'src/app/interfaces/report';

@Component({
  selector: 'app-report-sent',
  templateUrl: './report-sent.component.html',
  styleUrls: ['./report-sent.component.sass']
})
export class ReportSentComponent implements OnInit {

  public isCollapsed = true;
  @Input() report?:Report;
  @Input() active?:boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
