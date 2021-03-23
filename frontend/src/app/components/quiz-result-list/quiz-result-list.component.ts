import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizResult } from 'src/app/interfaces/quiz-result';
import { QuizResultService } from 'src/app/services/quiz-result.service';

@Component({
  selector: 'app-quiz-result-list',
  templateUrl: './quiz-result-list.component.html',
  styleUrls: ['./quiz-result-list.component.sass']
})
export class QuizResultListComponent implements OnInit {

  @Input() deckId?:string;
  public resultList:Array<QuizResult> = []

  constructor(private route:ActivatedRoute, private quizResultService:QuizResultService) { }

  ngOnInit(): void {

    if (this.deckId != undefined){
      console.log("deckId: " + this.deckId!)
      this.quizResultService.getQuizResultsByDeckId(this.deckId).subscribe(res => this.resultList = res, err=> console.error(err));

    }

  }

}
