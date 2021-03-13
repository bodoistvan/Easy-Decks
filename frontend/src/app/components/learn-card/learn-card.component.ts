import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-learn-card',
  templateUrl: './learn-card.component.html',
  styleUrls: ['./learn-card.component.sass']
})
export class LearnCardComponent implements OnInit {

  @Input() word?:string;

  constructor() { }

  ngOnInit(): void {
  }

}
