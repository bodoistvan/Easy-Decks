import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Quiz } from 'src/app/interfaces/quiz';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-quiz-inprogress',
  templateUrl: './quiz-inprogress.component.html',
  styleUrls: ['./quiz-inprogress.component.sass']
})
export class QuizInprogressComponent implements OnInit {

  @Output() createQuiz:EventEmitter<any> = new EventEmitter();
  public quiz?:Quiz;

  constructor(
    private quizService:QuizService,
    private router:Router,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {

      this.route.queryParams.subscribe( params => {
        const deckId = params["id"];

        if (deckId != undefined){
          this.quizService.getQuizInprogress( deckId ).subscribe(data => this.quiz = data, ()=>{});
        }
      })

      

  }

  onContinueClick(){
    this.router.navigate(["decks", "quiz"], {queryParams: {id : this.quiz!.id}})
  }

  onCreateClick(){
    this.createQuiz.emit();
  }

}
