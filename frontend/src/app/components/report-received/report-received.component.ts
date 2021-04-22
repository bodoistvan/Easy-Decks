import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Report } from 'src/app/interfaces/report';
import { CardService } from 'src/app/services/card.service';
import { ReportServiceService } from 'src/app/services/report-service.service';

@Component({
  selector: 'app-report-received',
  templateUrl: './report-received.component.html',
  styleUrls: ['./report-received.component.sass']
})
export class ReportReceivedComponent implements OnInit {

  public isCollapsed = true;
  @Input() report?:Report
  @Input() active?:boolean
  @Output() cardSaved: EventEmitter<any> = new EventEmitter()
  @Output() reportSubmit: EventEmitter<any> = new EventEmitter()

  constructor(
     private fb: FormBuilder,
     private reportService:ReportServiceService, 
     private cardService:CardService,
     private router:Router
     ) { }

  public cardForm = this.fb.group({
    id: [],
    lang1 : [],
    lang2 : []
  })

  ngOnInit(): void {
    if (this.report != undefined){
      this.cardForm.setValue(this.report.card);
    }
    if (this.active != undefined){
      if( this.active == true){
        this.isCollapsed = false;
      }
    }
  }

  setCollapsed(newState:boolean){
    this.isCollapsed = newState;
    console.log(this.report?.id);
  }

  redoClicked(index: number){
    //index: 1,2

    if (index == 1){
      const fc = this.cardForm.get("lang1") as FormControl;
      fc.reset();
      this.cardForm.patchValue({lang1:this.report!.card.lang1})
    }

    if (index == 2){
      const fc = this.cardForm.get("lang2") as FormControl;
      fc.reset();
      this.cardForm.patchValue({lang2:this.report!.card.lang2})
    }

  }

  get shouldSaveCard():boolean{
    const lang1 = this.cardForm.get("lang1") as FormControl; 
    const lang2 = this.cardForm.get("lang2") as FormControl; 

    if (lang1.dirty || lang2.dirty){
      return true;
    }

    return false;
  }

  onSeeDeckClick(){
    this.router.navigate(["decks", "modify"], {queryParams: { id: this.report!.deck, selected: this.report!.card.id }});
  }

  statusLang(index: number){

    if (index == 1){
      const fc = this.cardForm.get("lang1") as FormControl;
      return fc.dirty;
    }
    if (index == 2){
      const fc = this.cardForm.get("lang2") as FormControl;
      return fc.dirty;
    }
    return false;
  }

  ignoreReport(){
    this.reportService.submitReport(this.report!.id,"ignore").subscribe((data) => {this.reportSubmit.emit(this.report!.id)});
  }

  acceptReport(){
    if (this.shouldSaveCard == true){
        this.cardService.updateCard(this.report!.card.id, this.cardForm.value).subscribe((data) => {
         
        });
      this.cardSaved.emit({ ...this.cardForm.value })
    }
    
    this.reportService.submitReport(this.report!.id,"accept").subscribe((data) => this.reportSubmit.emit(this.report!.id));
  }

}
