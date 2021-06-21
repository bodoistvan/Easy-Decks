import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Deck } from 'src/app/interfaces/deck';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
   
  }

  createOnClick(){
    this.router.navigate(["decks","create"])
  }

}
