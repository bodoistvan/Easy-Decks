import {  Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DecksService } from 'src/app/services/decks.service';
import { DeckSearchComponent } from '../deck-search/deck-search.component';

@Component({
  selector: 'app-new-deck',
  templateUrl: './new-deck.component.html',
  styleUrls: ['./new-deck.component.sass']
})
export class NewDeckComponent implements OnInit  {
  
  constructor(private fb: FormBuilder, private deckService:DecksService, private route:ActivatedRoute) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      let id = params["id"];
      
      if (id !=null){
        this.deckService.getDeckInfoByIdAll(id).subscribe(data => this.deckForm.patchValue(data), err => console.error(err));
    }
   })

  }

  public testBool = false;

  testbutton(){
    this.testBool = !this.testBool;
  }

  deleteButtonClick(i:number){
    let fg = this.cards.at(i) as FormGroup;

    let card = fg.value;
    if ( card.delete === undefined){
      fg.addControl('delete', new FormControl(true));
    } else {
      card.delete = !card.delete
      fg.patchValue(card)
    } 
  }

  isCardShouldBeDeleted(i:number):boolean{
    return this.cards.at(i).value.delete === undefined ? false : this.cards.at(i).value.delete;
  }

  get isModify():boolean{
      let id = this.deckForm.get("id") as FormControl;
      return id.value !== "";
  }

  public deckForm = this.fb.group({
    id: [''],
    name: ['Gardening'],
    lang1: ['HUN'],
    lang2: ['USA'],
    level: ['ADVANCED'],
    public: ['false'],
    cards: this.fb.array([
      this.fb.group({
        id: "60493b306abfd846e02c10fb",
        lang1: "kutya",
        lang2: "dog",
      }),
      this.fb.group({
        id: "",
        lang1: "",
        lang2: "",
      })
    ])
  });
  
  get cards(){
    return this.deckForm.get('cards') as FormArray;
  }
  
  addCards(){
    this.cards.push(
      this.fb.group({
        id: "",
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

  onSubmit():void {
    this.deckService.createDeck(this.deckForm.value).subscribe( rep => console.log(rep) );
  }


  
}


