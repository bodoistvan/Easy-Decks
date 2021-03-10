import { Component, OnInit } from '@angular/core';
import { DecksService } from 'src/app/services/decks.service';
import { Deck } from '../../interfaces/deck';

@Component({
  selector: 'app-decklist',
  templateUrl: './decklist.component.html',
  styleUrls: ['./decklist.component.sass']
})
export class DecklistComponent implements OnInit {

  constructor(private decksService: DecksService) { }

  public decks:Deck[] = []

  ngOnInit(): void {
    this.decksService.getDecks().subscribe( data => this.decks = data );
  }

}
