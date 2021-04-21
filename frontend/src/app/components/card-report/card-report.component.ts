import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ReportServiceService } from 'src/app/services/report-service.service';

@Component({
  selector: 'app-card-report',
  templateUrl: './card-report.component.html',
  styleUrls: ['./card-report.component.sass']
})
export class CardReportComponent implements OnInit {

  @Input() cardId?:string;
  @Output() onReport: EventEmitter<any> = new EventEmitter();

  constructor(
    public activeModal: NgbActiveModal, 
    private fb: FormBuilder,
    private reportService:ReportServiceService
    ) {}

  ngOnInit(): void {
  }

  public reportForm = this.fb.group({
    type: "spelling",
    text: ""
  })

  reportButtonClick(){
    const report = { cardId: this.cardId!, ...this.reportForm.value}
    this.reportService.createReport(report).subscribe(()=>this.onReport.emit());
    this.activeModal.close('Close click')
  }

}