import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DeckInfo } from 'src/app/interfaces/deck-info';
import { QuizResult } from 'src/app/interfaces/quiz-result';
import { DecksService } from 'src/app/services/decks.service';
import { QuizResultService } from 'src/app/services/quiz-result.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-deck-info',
  templateUrl: './deck-info.component.html',
  styleUrls: ['./deck-info.component.sass']
})
export class DeckInfoComponent implements OnInit {

  constructor(private deckService:DecksService, private route: ActivatedRoute,
     private fb:FormBuilder, private quizService: QuizService, private quizResultServive:QuizResultService,
     private router:Router) { }

  public active:number = 1;
  public deckInfo?:DeckInfo;
  public lastResults?: QuizResult[];
  public lqActive:number = 0;

  ngOnInit(): void {
    
    this.route.queryParams.subscribe(params => {
      let id = params["id"];
      
      if (id !=null){
        this.getInfo(id);
      }
      //TODO on error should route /decks
      
    })
  }

  getInfo(id:string){
    this.deckService.getDeckInfoById(id).subscribe(data => this.deckInfo = data, err => console.error(err));
    this.quizResultServive.getLastQuizResultByDeckId(id).subscribe(data => this.lastResults=data, err => console.error(err));
  }

  onClick():void {
    console.log(this.deckInfo)
  }

  public quizStartForm = this.fb.group({
    language: ["lang1"],
    type: ["all"],
    amount: ["10"]
  });

  public learnStartForm = this.fb.group({
    type: ["all"]
  }) 

  
  get selectedLang(){
    return this.quizStartForm.get('language')?.value;
  }

  onQuizSubmit(){
    const body = {
      deckId :this.deckInfo!.id, 
      amount : this.quizStartForm.value.amount * 1,
      language : this.quizStartForm.value.language,
      type: this.quizStartForm.value.type
    }
    this.quizService.createQuiz(body)
      .subscribe(res => 
        {
          const quizId = res.id;
          this.router.navigate(["decks", "quiz"], {queryParams : { id: quizId } });
        });
  }

  onModifyButtonClick(){
    this.router.navigate(["decks", "modify"], {queryParams : { id: this.deckInfo!.id }});
  }

  onLearnSubmit(){
    const params = this.learnStartForm.value;
    this.router.navigate(["decks", "learn"], {queryParams : { id: this.deckInfo!.id, type: params.type } });
  }

  onShowAllResult(){
    if (this.deckInfo)
      this.router.navigate(["quizresults"], {queryParams: { id: this.deckInfo.id }});
  }

  onlqClick(index: number){
    this.lqActive = index;
  }


}
