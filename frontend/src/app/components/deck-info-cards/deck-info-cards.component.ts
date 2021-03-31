import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { Card } from 'src/app/interfaces/card';
import { DecksService } from 'src/app/services/decks.service';

@Component({
  selector: 'app-deck-info-cards',
  templateUrl: './deck-info-cards.component.html',
  styleUrls: ['./deck-info-cards.component.sass']
})
export class DeckInfoCardsComponent implements OnInit {

  constructor(private fb:FormBuilder, private deckService: DecksService) { }

  @Input() deckId?:string;

  ngOnInit(): void {
    this.deckService.getDeckCards(this.deckId!, "statistic").subscribe(data => {
      this.StaticList = data;
      this.ShowList = this.StaticList;
    })
  } 

  TestLog(){
    console.log("changed");
  }

  public StaticList?:Card[];
  public AllList?:Card[];
  public BookMarkedList?:Card[];
  public ShowList?:Card[];

  public CardSelect = this.fb.group({
    selected: ["statistic"]
  })

  onSelectedClick(){
    const selected = this.CardSelect.value.selected;
   
    switch (selected) {
      case "all":
        this.deckService.getDeckCards(this.deckId!, "all").subscribe(data => {
          this.AllList = data;
          this.ShowList = this.AllList;
        })
        break;
      
      case "statistic":
        this.deckService.getDeckCards(this.deckId!, "statistic").subscribe(data => {
          this.StaticList = data;
          this.ShowList = this.StaticList;
        })
        break;

      case "bookmarked":
        this.deckService.getDeckCards(this.deckId!, "bookmarked").subscribe(data => {
          this.BookMarkedList = data;
          this.ShowList = this.BookMarkedList;
        })
        break;
    
      default:
        break;
    }
    
  }

}
