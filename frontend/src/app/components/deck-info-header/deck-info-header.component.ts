import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-deck-info-header',
  templateUrl: './deck-info-header.component.html',
  styleUrls: ['./deck-info-header.component.sass']
})
export class DeckInfoHeaderComponent implements OnInit {

  @Input() name:string ="";
  @Input() lang1?: string;
  @Input() lang2?: string;
  @Input() difficulty: number = 2;

  constructor() { }

  ngOnInit(): void {
    console.log(this.name)
    console.log(this.lang1)
    console.log(this.lang2)
    console.log(this.difficulty)
  }

}
