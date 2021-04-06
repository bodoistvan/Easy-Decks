import { Component, OnInit } from '@angular/core';
import { Report } from 'src/app/interfaces/report';
import { ReportServiceService } from 'src/app/services/report-service.service';

@Component({
  selector: 'app-reports-info-received',
  templateUrl: './reports-info-received.component.html',
  styleUrls: ['./reports-info-received.component.sass']
})
export class ReportsInfoReceivedComponent implements OnInit {

  public reports:Report[] = [];
  
  constructor(private reportSevice:ReportServiceService) { }

  ngOnInit(): void {
    this.reportSevice.getReceivedRerports().subscribe(data => this.reports = data);
  }

}
