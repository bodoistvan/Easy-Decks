import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Report } from 'src/app/interfaces/report';

@Component({
  selector: 'app-report-received',
  templateUrl: './report-received.component.html',
  styleUrls: ['./report-received.component.sass']
})
export class ReportReceivedComponent implements OnInit {

  public isCollapsed = true;
  @Input() report?:Report
  @Input() active?:boolean

  constructor(private fb: FormBuilder) { }

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

  

}