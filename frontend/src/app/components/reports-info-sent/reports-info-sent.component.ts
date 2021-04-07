import { Component, OnInit } from '@angular/core';
import { Report } from 'src/app/interfaces/report';
import { ReportServiceService } from 'src/app/services/report-service.service';

@Component({
  selector: 'app-reports-info-sent',
  templateUrl: './reports-info-sent.component.html',
  styleUrls: ['./reports-info-sent.component.sass']
})
export class ReportsInfoSentComponent implements OnInit {

  public reports:Report[] = [];
  
  constructor(private reportSevice:ReportServiceService) { }

  ngOnInit(): void {
    this.reportSevice.getSentReports().subscribe(data => this.reports = data);
  }

}
