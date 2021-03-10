import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-deck',
  templateUrl: './new-deck.component.html',
  styleUrls: ['./new-deck.component.sass']
})
export class NewDeckComponent implements OnInit  {
  
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  public deckForm = this.fb.group({
    name: ['Gardening'],
    lang1: ['HUN'],
    lang2: ['USA'],
    level: ['ADVANCED'],
    public: ['true'],
    cards: this.fb.array([
      this.fb.group({
        lang1: "",
        lang2: ""
      })
    ])
  });
  
  get cards(){
    return this.deckForm.get('cards') as FormArray;
  }
  
  addCards(){
    this.cards.push(
      this.fb.group({
        lang1: "",
        lang2: ""
      })
    )
  }


  get lang1(){
    return this.deckForm.get('lang1')?.value;
  }

  get lang2(){
    return this.deckForm.get('lang2')?.value;
  }


  debugMyCode(param:any){
   console.log(param); 
  }

  modelChanged(i:number){
    let count = this.cards.length;
    if (count - 1 === i) {
      this.addCards();
    }
  }
  
}


