import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.sass']
})
export class DeckComponent implements OnInit {

  @Input() name: string = "";
  @Input() lang1: string = "";
  @Input() lang2: string = "";
  @Input() level: string = "";
  @Input() count: number = 0;
  @Input() id: string = "";


  constructor(private router:Router) { }

  ngOnInit(): void {

  }

  onNameClick(){
    this.router.navigate(["decks","info"], {queryParams: {id: this.id}});
  }

}
