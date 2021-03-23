import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-quiz-result-info',
  templateUrl: './quiz-result-info.component.html',
  styleUrls: ['./quiz-result-info.component.sass']
})
export class QuizResultInfoComponent implements OnInit {

  constructor(private route:ActivatedRoute) { }

  public deckId?:string;

  ngOnInit(): void {
    this.route.queryParams.subscribe(res => this.deckId = res.id, err=> console.error(err));
  }

}
