import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizResult } from 'src/app/interfaces/quiz-result';

@Component({
  selector: 'app-quiz-result-list',
  templateUrl: './quiz-result-list.component.html',
  styleUrls: ['./quiz-result-list.component.sass']
})
export class QuizResultListComponent implements OnInit {

  @Input() deckId?:string;
  @Input() quizResults:Array<QuizResult> = []

  public activeIndex: number = 0
  public indexArray: Array<boolean> = [];

  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.indexArray.push(true);
    for (let i = 0; i < this.quizResults.length -1 ; i++)
      this.indexArray.push(false)
  }


  

}
