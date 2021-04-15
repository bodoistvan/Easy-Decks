import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { DecksService } from 'src/app/services/decks.service';

@Component({
  selector: 'app-deck-subscribe-button',
  templateUrl: './deck-subscribe-button.component.html',
  styleUrls: ['./deck-subscribe-button.component.sass']
})
export class DeckSubscribeButtonComponent implements OnInit {

  constructor(private deckService:DecksService) { }

  @Input() public isSubbed : boolean = true
  @Input() public deckId?:string 
  @Output() public refresh: EventEmitter<string> = new EventEmitter();

  ngOnInit(): void {
  }

  onSubButtonClick(){
    if (this.deckId != undefined){
      if (this.isSubbed == false){
        this.deckService.subscribeToDeck( this.deckId, "subscribe" ).subscribe(()=>this.refresh.emit(this.deckId))
      } else {
        this.deckService.subscribeToDeck( this.deckId, "unsubscribe" ).subscribe(()=>this.refresh.emit(this.deckId))
      }
    }
  }

}
