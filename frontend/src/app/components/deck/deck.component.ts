import { Component, Input, OnInit } from '@angular/core';

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


  constructor() { }

  ngOnInit(): void {
  }

}
