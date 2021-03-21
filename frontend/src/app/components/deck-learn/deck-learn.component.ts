import { HttpParams } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Card } from 'src/app/interfaces/card';
import { DeckWithCards } from 'src/app/interfaces/deck-with-cards';
import { CardStatService } from 'src/app/services/card-stat.service';
import { DecksService } from 'src/app/services/decks.service';

@Component({
  selector: 'app-deck-learn',
  templateUrl: './deck-learn.component.html',
  styleUrls: ['./deck-learn.component.sass']
})
export class DeckLearnComponent implements OnInit {

  constructor(private fb:FormBuilder, private route:ActivatedRoute, private deckService:DecksService, private cardStatService: CardStatService) { }

  private deckId?:string;
  public deck?:DeckWithCards;

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.deckId = params["id"];
    
      if (this.deckId !=null){
        const queryParams: HttpParams = new HttpParams().append('with', 'bookmark');
        this.deckService.getDeckInfoByIdAll(this.deckId, queryParams).subscribe(data => {
          this.deck = data; 
        });
      }
      
       
    })

    const fc = this.learnForm.get('range') as FormControl;
    fc.registerOnChange(this.rangeChange);
  }

  rangeChange(){
    console.log("range has been chahnged!");
  }

  public learnForm = this.fb.group({
    range: [0]
  });

  get range():number{
    return this.learnForm.get('range')?.value;
  }
  
  getWord(lang:number):any {

    const index = this.learnForm.get('range')?.value;
    if (index != undefined)
      return lang == 1 ? this.deck?.cards[index].lang1 : this.deck?.cards[index].lang2;
    
  }

  get maxRange(){
    if (this.deck)
      return this.deck?.cards.length -1;
    else
      return 0;
  }

  getCardIndex(){
    const val = this.learnForm.get('range')?.value;
    if (val)
      return val;
    else
      return 0;
  }

  getCard():Card {
    const val = this.learnForm.get('range')?.value;
    if (this.deck != undefined){
      return this.deck.cards[val];
    } else {
      return {id: "", lang1: "", lang2:""};
    }
  }

  isBookMarked():boolean {
    const val = this.learnForm.get('range')?.value;
    if (this.deck != undefined){
      return this.deck.cards[val].bookmarked!;
    } else {
      return false;
    }
  }

  onBookMarkButtonClick(){
    const cardId = this.getCard().id;
    this.cardStatService.bookMarkStat(cardId, !this.isBookMarked())
      .subscribe(res => {
        this.getCard().bookmarked = res.bookmarked;
      }, err=>console.error(err));
  }

  mofidyRange(step:number):void{
    let val = this.learnForm.get('range')?.value;
    val += step;

    if (this.deck == undefined){
      return;
    }
      

    if (val < 0 || val > this.deck.cards.length - 1)
      return;
    console.log("changing");
    this.learnForm.get('range')?.setValue(val);
    
  }


}
