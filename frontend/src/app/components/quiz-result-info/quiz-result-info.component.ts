import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizResult } from 'src/app/interfaces/quiz-result';
import { QuizResultService } from 'src/app/services/quiz-result.service';

@Component({
  selector: 'app-quiz-result-info',
  templateUrl: './quiz-result-info.component.html',
  styleUrls: ['./quiz-result-info.component.sass']
})
export class QuizResultInfoComponent implements OnInit {

  constructor(private route:ActivatedRoute,private quizResultService:QuizResultService) { }

  public deckId?:string;
  public resultList:Array<QuizResult> = []

  ngOnInit(): void {
    this.route.queryParams.subscribe(res => this.deckId = res.id, err=> console.error(err));

    if (this.deckId != undefined){
      console.log("deckId: " + this.deckId!)
      this.quizResultService.getQuizResultsByDeckId(this.deckId).subscribe(res => this.resultList = res, err=> console.error(err));
    }
  }

}
