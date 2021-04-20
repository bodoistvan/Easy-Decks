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
  @Input() difficulty: number = 1;
  @Input() count: number = 0;
  @Input() id: string = "";


  constructor(private router:Router) { }

  ngOnInit(): void {
    console.log(this.difficulty);
  }

  onNameClick(){
    this.router.navigate(["decks","info"], {queryParams: {id: this.id}});
  }

}
