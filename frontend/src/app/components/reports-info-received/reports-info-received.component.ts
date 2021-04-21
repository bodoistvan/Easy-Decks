import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Report } from 'src/app/interfaces/report';
import { ReportServiceService } from 'src/app/services/report-service.service';
import { ReportReceivedComponent } from '../report-received/report-received.component';

@Component({
  selector: 'app-reports-info-received',
  templateUrl: './reports-info-received.component.html',
  styleUrls: ['./reports-info-received.component.sass']
})
export class ReportsInfoReceivedComponent implements OnInit {

  @ViewChildren("reportsDOM") reportsDOM?: QueryList<ReportReceivedComponent>;

  public reports:Report[] = [];
  
  constructor(private reportSevice:ReportServiceService) { }

  ngOnInit(): void {
    this.reportSevice.getReceivedRerports().subscribe(data => this.reports = data);
  }

  reportSubmitted( id:string ){
    console.log(id);
    if (this.reports.length > 0){
      const report = this.reports.find( report =>  report.id + "" == id + "");
      if (report != undefined){
        const index = this.reports.indexOf(report);
        this.reports.splice(index, 1);

        if (this.reportsDOM!.length - 1 > index){
          this.reportsDOM?.get(index + 1)?.setCollapsed(false);
        }

      }
    }
    
    
  }

  cardSaved(card:any){

    this.reports.forEach( report => {
      if (report.card.id + "" == card.id + ""){
        report.newCard = { lang1 : card.lang1, lang2: card.lang2 }
        report.changed = true;
      }
    })

  }

}
