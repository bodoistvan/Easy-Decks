import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DeckWithCards } from 'src/app/interfaces/deck-with-cards';
import { DecksService } from 'src/app/services/decks.service';

@Component({
  selector: 'app-deck-learn',
  templateUrl: './deck-learn.component.html',
  styleUrls: ['./deck-learn.component.sass']
})
export class DeckLearnComponent implements OnInit {

  constructor(private fb:FormBuilder, private route:ActivatedRoute, private deckService:DecksService) { }

  private deckId?:string;
  public deck?:DeckWithCards;
  public maxRange:number = 0;

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.deckId = params["id"];
    
      if (this.deckId !=null)
        this.deckService.getDeckInfoByIdAll(this.deckId).subscribe(data => {
          this.deck = data; 
          this.maxRange = data.cards.length - 1;
        });
       
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

  mofidyRange(step:number):void{
    let val = this.learnForm.get('range')?.value;
    val += step;

    if (val < 0 || val > this.maxRange)
      return;
    console.log("changing");
    this.learnForm.get('range')?.setValue(val);
    
  }


}
