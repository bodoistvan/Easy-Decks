import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dif-dots',
  templateUrl: './dif-dots.component.html',
  styleUrls: ['./dif-dots.component.sass']
})
export class DifDotsComponent implements OnInit {

  private maxDots: number = 5;
  public currentValue: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
