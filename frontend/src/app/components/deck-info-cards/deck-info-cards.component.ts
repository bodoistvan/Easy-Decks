import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Card } from 'src/app/interfaces/card';
import { CardStatService } from 'src/app/services/card-stat.service';
import { DecksService } from 'src/app/services/decks.service';
import { YouSureComponent } from '../you-sure/you-sure.component';

@Component({
  selector: 'app-deck-info-cards',
  templateUrl: './deck-info-cards.component.html',
  styleUrls: ['./deck-info-cards.component.sass']
})
export class DeckInfoCardsComponent implements OnInit {

  constructor(
    private fb:FormBuilder,
    private deckService: DecksService,
    private modalService: NgbModal,
    private cardStatSevice: CardStatService
    ) { }

  @Input() deckId?:string;

  ngOnInit(): void {
    this.deckService.getDeckCards(this.deckId!, "bookmarked").subscribe(data => {
      this.BookMarkedList = data;
      this.ShowList = this.BookMarkedList;
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
    selected: ["bookmarked"]
  })

  getSelected(){
    return this.CardSelect.get("selected")?.value;
  }

  onResetStatisticClick() {
    const modalRef = this.modalService.open(YouSureComponent, {centered: true});
    modalRef.componentInstance.onSubmit.subscribe(()=> this.resetStatisctic())
    modalRef.componentInstance.text = "Are you sure you want to reset your statistic?"
  }

  resetStatisctic(){
    if (this.deckId != undefined){
      this.cardStatSevice.resetStat(this.deckId).subscribe(()=> {
        if (this.getSelected() == 'statistic'){
          this.ShowList = [];
        }
      })
    }
    
  }

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
