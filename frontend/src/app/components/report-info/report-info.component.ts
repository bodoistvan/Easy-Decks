import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report-info',
  templateUrl: './report-info.component.html',
  styleUrls: ['./report-info.component.sass']
})
export class ReportInfoComponent implements OnInit {

  public selectedReport = "received"

  constructor() { }

  ngOnInit(): void {
  }

}
