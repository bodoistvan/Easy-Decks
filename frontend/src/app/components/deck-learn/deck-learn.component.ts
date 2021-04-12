import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Card } from 'src/app/interfaces/card';
import { DeckWithCards } from 'src/app/interfaces/deck-with-cards';
import { CardStatService } from 'src/app/services/card-stat.service';
import { DecksService } from 'src/app/services/decks.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CardReportComponent } from '../card-report/card-report.component';



@Component({
  selector: 'app-deck-learn',
  templateUrl: './deck-learn.component.html',
  styleUrls: ['./deck-learn.component.sass']
})
export class DeckLearnComponent implements OnInit {

  constructor(
    private fb:FormBuilder, 
    private route:ActivatedRoute, 
    private deckService:DecksService, 
    private cardStatService: CardStatService,
    private modalService: NgbModal
    ) { }

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

  onRebortButtonClick(){
    const modalRef = this.modalService.open(CardReportComponent, {centered: true});
    modalRef.componentInstance.cardId = this.getCard().id;
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
