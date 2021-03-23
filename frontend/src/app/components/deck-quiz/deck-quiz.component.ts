import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, interval } from 'rxjs';
import { Quiz } from 'src/app/interfaces/quiz';
import { QuizQuestion } from 'src/app/interfaces/quiz-question';
import { QuizQuestionResult } from 'src/app/interfaces/quiz-question-result';
import { QuizService } from 'src/app/services/quiz.service';


@Component({
  selector: 'app-deck-quiz',
  templateUrl: './deck-quiz.component.html',
  styleUrls: ['./deck-quiz.component.sass']
})
export class DeckQuizComponent implements OnInit {

  constructor(private quizService:QuizService, private route:ActivatedRoute, private fb:FormBuilder) { }

  public action:string = "question"; //question or answered

  private deckId?: string;
  public quizQuestion?: Quiz;
  public currentQuestion: QuizQuestion = { id: "", word :""};

  private myTimer = interval(1000);

  public durationTime:Date = new Date(0);

  get time(){

    if (this.quizQuestion){
      const started = new Date( this.quizQuestion.startedAt );
      const diffDate = new Date(Date.now()).getTime() - started.getTime();
      
      return new Date( diffDate );

    }
    return 0;
    
  }
  

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      const id = params.id;

      if ( id != undefined){
        this.deckId = id;
        console.log(id);
        this.quizService.getQuizQuestionsById(this.deckId!).subscribe(data => {
          console.log(data);
          this.quizQuestion = data;

          if(this.quizQuestion.questions!.length > 0){
            this.currentQuestion = this.quizQuestion.questions![0];

            this.answerForm.patchValue(this.currentQuestion);

          }
          this.updateDurationTime();

        });
      }

    });
    
    this.myTimer.subscribe(() => this.updateDurationTime());
    
  }

  private updateDurationTime():void{
    if (this.quizQuestion){
      const started = new Date( this.quizQuestion.startedAt );
      const diffDate = new Date(Date.now()).getTime() - started.getTime();
      
      this.durationTime =  new Date( diffDate );

    }
  }

  public answerForm = this.fb.group({
    "id" : [""],
    "word" : [""],
    "answer" : [{value: "", disabled:false}]
  })

  onQuestionSubmit(){
    const id = this.answerForm.value.id;
    const fg = this.answerForm as FormGroup;
    const answer = fg.get("answer") as FormControl ;

    answer.disable();

    this.quizService.answerQuizQuestion(this.deckId!, { id, word: answer.value }).subscribe(res => {
      this.result = res;
      console.log(res);
      this.action = "answered";

    })

  }

  public result?:QuizQuestionResult;

  get getResultStatus():number{
    if (this.result != undefined){
      if (this.result.status == "correct")
        return 0;
    }
    
    return 1;
  }

  onAnsweredSubmit(){
    this.action = "question"
    const answer = this.answerForm.get("answer") as FormControl ;

    this.quizQuestion?.questions!.splice(0,1);
   

    if (this.quizQuestion!.questions!.length > 0){
      this.answerForm.setValue({ ...this.quizQuestion?.questions![0], answer: ""});
      this.currentQuestion = this.quizQuestion!.questions![0];
    }

    answer.enable();

  }




}
