import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  public quizQuestions: QuizQuestion[] = [];
  public currentQuestin: QuizQuestion = { id: "", word :""};

 
  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      const id = params.id;

      if ( id != undefined){
        this.deckId = id;
        console.log(id);
        this.quizService.getQuizQuestionsById(this.deckId!).subscribe(data => {
          this.quizQuestions = data;

          if(this.quizQuestions.length > 0){
            this.currentQuestin = this.quizQuestions[0];

            this.answerForm.patchValue(this.quizQuestions[0]);

          }

        });
      }

    });
    
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

    this.quizQuestions.splice(0,1);
   

    if (this.quizQuestions.length > 0){
      this.answerForm.setValue({ ...this.quizQuestions[0], answer: ""});
      this.currentQuestin = this.quizQuestions[0];
    }

    answer.enable();

  }




}
