import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Quiz } from 'src/app/interfaces/quiz';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-quiz-inprogress',
  templateUrl: './quiz-inprogress.component.html',
  styleUrls: ['./quiz-inprogress.component.sass']
})
export class QuizInprogressComponent implements OnInit {

  public quiz?:Quiz;

  constructor(
    private quizService:QuizService,
    private router:Router
  ) { }

  ngOnInit(): void {

      this.quizService.getQuizInprogress().subscribe(data => this.quiz = data, ()=>{});

  }

  onContinueClick(){
    this.router.navigate(["decks", "quiz"], {queryParams: {id : this.quiz!.id}})
  }

}
