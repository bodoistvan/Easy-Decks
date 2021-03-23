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

  public deckInfo?:DeckInfo;
  public lastResult?: QuizResult;

  ngOnInit(): void {
    
    this.route.queryParams.subscribe(params => {
      let id = params["id"];
      
      if (id !=null){
        this.deckService.getDeckInfoById(id).subscribe(data => this.deckInfo = data, err => console.error(err));
        this.quizResultServive.getLastQuizResultByDeckId(id).subscribe(data => this.lastResult=data, err => console.error(err));
    }
      //TODO on error should route /decks
      
    })
  }

  onClick():void {
    console.log(this.deckInfo)
  }

  public quizStartForm = this.fb.group({
    language: [""],
    amount: [""]
  });

  onQuizSubmit(){

    console.log(this.deckInfo);
    console.log(this.quizStartForm.value);

    this.quizService.createQuiz(this.deckInfo!.id, this.quizStartForm.value.amount * 1, this.quizStartForm.value.language)
      .subscribe(res => 
        {
          const quizId = res.id;
          this.router.navigate(["decks", "quiz"], {queryParams : { id: quizId } });

        });

    
  }

  onShowAllResult(){
    console.log("asd");
    if (this.deckInfo)
      this.router.navigate(["quizresults"], {queryParams: { id: this.deckInfo.id }});
  }


}
