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

  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {


  }

}
