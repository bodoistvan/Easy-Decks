import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeckInfo } from 'src/app/interfaces/deck-info';
import { DecksService } from 'src/app/services/decks.service';

@Component({
  selector: 'app-deck-info',
  templateUrl: './deck-info.component.html',
  styleUrls: ['./deck-info.component.sass']
})
export class DeckInfoComponent implements OnInit {

  constructor(private deckService:DecksService, private route: ActivatedRoute) { }

  public deckInfo?:DeckInfo;

  ngOnInit(): void {
    
    this.route.queryParams.subscribe(params => {
      let id = params["id"];
      
      if (id !=null){
        this.deckService.getDeckInfoById(id).subscribe(data => this.deckInfo = data, err => console.error(err));
    }
      //TODO on error should route /decks
      
    })


      
    

  }

  onClick():void {
    console.log(this.deckInfo)
  }


}
