import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Report } from 'src/app/interfaces/report';
import { ReportServiceService } from 'src/app/services/report-service.service';
import { YouSureComponent } from '../you-sure/you-sure.component';

@Component({
  selector: 'app-report-sent',
  templateUrl: './report-sent.component.html',
  styleUrls: ['./report-sent.component.sass']
})
export class ReportSentComponent implements OnInit {

  public isCollapsed = true;
  @Input() report?:Report;
  @Input() active?:boolean;
  @Output() reportDeleted: EventEmitter<any> = new EventEmitter()

  constructor(
    private modalService: NgbModal,
    private reportSevice: ReportServiceService
  ) { }

  ngOnInit(): void {
  }

  onDeleteClick(){
    const modalRef = this.modalService.open(YouSureComponent, {centered: true});
    modalRef.componentInstance.text = "Are you sure you want to delete this report?"
    modalRef.componentInstance.onSubmit.subscribe(() => this.deleteReport());
  }

  deleteReport(){
    this.reportSevice.deleteReport( this.report!.id ).subscribe(() => this.reportDeleted.emit( this.report!.id ));
  }

}
