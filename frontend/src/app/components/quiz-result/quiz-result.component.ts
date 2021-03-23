import { Component, Input, OnInit } from '@angular/core';
import { QuizResult } from 'src/app/interfaces/quiz-result';

@Component({
  selector: 'app-quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.sass']
})
export class QuizResultComponent implements OnInit {

  public Active = true;
  @Input() result: QuizResult = {
    id : "aaa",
    user: "bbb",
    amount: 5,
    deck: "ccc",
    selectedLang : "lang1",
    finishedAt: new Date(Date.now()),
    startedAt: new Date( Date.now() - 5000 * 60 - 4200),
    resultPercent: 60,
    results : [
      {
        id: "c1",
        lang1: "this is a test",
        lang2: "ez egy teszt",
        status: "correct"
      },
      {
        id: "c1",
        lang1: "apple",
        lang2: "alma",
        status: "correct"
      },
      {
        id: "c1",
        lang1: "apple",
        lang2: "alma",
        status: "wrong"
      },
      {
        id: "c1",
        lang1: "apple",
        lang2: "alma",
        status: "wrong"
      },
      {
        id: "c1",
        lang1: "apple",
        lang2: "alma",
        status: "correct"
      }
    ]
  }

  get timer(){
    return new Date(new Date(this.result.finishedAt).getTime() -  new Date(this.result.startedAt).getTime() );
  }

  constructor() { }

  ngOnInit(): void {
  }

  onButtonClick(){
    this.Active = !this.Active;
  }

}
