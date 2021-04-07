import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DecksService } from 'src/app/services/decks.service';
import { Deck } from '../../interfaces/deck';

@Component({
  selector: 'app-decklist',
  templateUrl: './decklist.component.html',
  styleUrls: ['./decklist.component.sass']
})
export class DecklistComponent implements OnInit {

  constructor(private decksService: DecksService, private router: Router, private route:ActivatedRoute) { }

  public decks:Deck[] = []
  public queryParams:any;

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {

      const lang1 = params["lang1"];
      const lang2 = params["lang2"];
      const name = params["name"];

      this.queryParams = {name: name, lang1: lang1, lang2:lang2 }
      const objParams = new HttpParams().append('lang1', lang1).append('lang2', lang2).append('name', name);
      console.log(objParams);
      this.decksService.getDecks(objParams).subscribe( data => this.decks = data );
      
    });

  }

  
}
