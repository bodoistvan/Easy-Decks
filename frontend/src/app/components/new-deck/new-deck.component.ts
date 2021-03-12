import {  Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { groupBy, retry } from 'rxjs/operators';
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
        this.deckService.getDeckInfoByIdAll(id).subscribe(data => {this.deckForm.patchValue(data); this.addCards()}, err => console.error(err));
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

    console.log(card);
    if ( card.action === undefined){

      fg.addControl('action', new FormControl("delete"));

    } else {
      if (card.action == "delete"){

        if (this.cards.at(i).get(`lang1`)?.dirty || this.cards.at(i).get(`lang2`)?.dirty) {

          card.action = "update";

        } else {

          card.action = "none";

        }
 
      } else{
          card.action="delete";
        }
      fg.patchValue(card)
    } 
  }

  isCardShouldBeDeleted(index:number):boolean{

    const action = this.cards.at(index).value.action || "";
    if (action == "delete")
      return true; 

    return false;

  }

  getCardActionAt(index:number, lang?:number):number {
    //0 none
    //1 delete
    //2 update
    //3 create
    
    const action = this.cards.at(index).value.action || "";

    if (action == "delete")
      return 1;

    if ( this.cards.at(index).value.id == "")
      return 3;

    if (lang != undefined) {
      if ( this.cards.at(index).get(`lang${lang}`)?.dirty )
        return 2;
    }
   
    return 0;
    
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
        id: "",
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
        lang2: "",
        action: "create"
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
    console.log("changed")
    let count = this.cards.length;
    if (count - 1 === i) {
      this.addCards();
    }

    let fg = this.cards.at(i) as FormGroup;

    let card = fg.value;

    if( card.action === undefined){
      fg.addControl('action', new FormControl("update"));
    } else {
      if (card.id == ""){
        card.action = "create"
      } else {
        card.action = "update";
      }
      
    }
    fg.patchValue(card);
  }

  onSubmit():void {
    this.deckService.createDeck(this.deckForm.value).subscribe( rep => console.log(rep) );
  }


  
}


