import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { interval } from 'rxjs';
import { Quiz } from 'src/app/interfaces/quiz';
import { QuizQuestion } from 'src/app/interfaces/quiz-question';
import { QuizQuestionResult } from 'src/app/interfaces/quiz-question-result';
import { QuizService } from 'src/app/services/quiz.service';


@Component({
  selector: 'app-deck-quiz',
  templateUrl: './deck-quiz.component.html',
  styleUrls: ['./deck-quiz.component.sass']
})
export class DeckQuizComponent implements OnInit, OnDestroy {

  constructor(
    private quizService:QuizService, 
    private route:ActivatedRoute, 
    private fb:FormBuilder,
    private el: ElementRef,
    private router:Router
    ) { }

  public action:string = "question"; //question or answered

  private deckId?: string;
  public quizQuestion?: Quiz;
  public currentQuestion: QuizQuestion = { id: "", word :""};

  private myTimer? : any;

  public durationTime:Date = new Date(0);
  public result?:QuizQuestionResult = {status : 'correct'};

  get time(){

    if (this.quizQuestion != undefined){
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
    this.myTimer = setInterval(()=>{
      this.updateDurationTime();
    },1000)
    
  }

  ngOnDestroy():void {
    console.log("destroy");
    clearInterval(this.myTimer);
  }

  public getIndexInQuiz(){
    if (this.quizQuestion != undefined)
      return this.quizQuestion.amount - this.quizQuestion.questions!.length;
    
    return 0;
  }

  public getMaxPg(){
    if (this.quizQuestion != undefined)
      return this.quizQuestion.amount;
    return 1;
  }

  private updateDurationTime():void{
    if (this.quizQuestion){
      const finished =  new Date( this.quizQuestion.finishAt );

      const diffTime = finished.getTime() - Date.now()
      if (diffTime < 0)
        this.finished();

      const diffDate = new Date( diffTime );
      console.log(diffTime);
      this.durationTime =  new Date( diffDate );

    }
  }

  public answerForm = this.fb.group({
    "id" : [""],
    "word" : [""],
    "answer" : ["", [Validators.required]]
  })

  getAnswer(){
    return this.answerForm.get("answer");
  }

  onQuestionSubmit(){
    const id = this.answerForm.value.id;
    const fg = this.answerForm;
    const answer = fg.get("answer") as FormControl ;

    if(this.answerForm.valid == false){
      answer.markAsTouched();
      return;
    } 

    this.quizService.answerQuizQuestion(this.deckId!, { id, word: answer.value }).subscribe(res => {
      this.result = res;
      this.action = "answered";

      if (this.result.status == "correct")
        setTimeout(()=> this.onAnsweredSubmit(), 2000);

      const answeringQuestionBlock = this.el.nativeElement.querySelector('#answeringQuestionBlock');

      if (answeringQuestionBlock) {
        answeringQuestionBlock.classList.remove('d-block');
        answeringQuestionBlock.classList.add('d-none');
      }

      const answeredBlock = this.el.nativeElement.querySelector('#answeredBlock');

      if (answeredBlock) {
        answeredBlock.classList.remove('d-none');
        answeredBlock.classList.add('d-block');
      }

      
      this.answerForm.patchValue({answer: answer.value});
      answer.disable();

      const answeredSubmit = this.el.nativeElement.querySelector('#answeredSubmit');

      if (answeredSubmit) {
        answeredSubmit.focus()
      }  
    })

    this.quizQuestion?.questions!.splice(0,1);

  }

  get getResultStatus():number{
    if (this.result != undefined){
      if (this.result.status == "correct")
        return 0;
    }
    
    return 1;
  }

  onAnsweredSubmit(){

    if (this.getMaxPg() - this.getIndexInQuiz() == 0 )
      this.finished();

    if(this.action != "question"){
      this.action = "question"
      const answer = this.answerForm.get("answer") as FormControl ;
  
      if (this.quizQuestion!.questions!.length > 0){
        this.answerForm.setValue({ ...this.quizQuestion?.questions![0], answer: ""});
        this.currentQuestion = this.quizQuestion!.questions![0];
      }
      answer.enable();
      answer.markAsUntouched()

      const element = this.el.nativeElement.querySelector('#answeringQuestionBlock');

      if (element) {
        element.classList.remove('d-none');
        element.classList.add('d-block');
      }

      const answeredBlock = this.el.nativeElement.querySelector('#answeredBlock');
      if (answeredBlock) {
        answeredBlock.classList.remove('d-block');
        answeredBlock.classList.add('d-none');
      }
        
      this.setAnswerInputActive();

    }

  }

  setAnswerInputActive() {
      const inputElement = this.el.nativeElement.querySelector('#answer');
      console.log(inputElement)
      if (inputElement) {
        inputElement.focus();
      }
  }

  onChange(){
    console.log("chaged");
  }

  finished(){
    this.router.navigate(["decks", "info"], {queryParams: { id : this.quizQuestion!.deckId }});
  }

}
