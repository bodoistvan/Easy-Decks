import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DeckComponent } from './components/deck/deck.component';

import { HttpClientModule } from '@angular/common/http';
import { DecklistComponent } from './components/decklist/decklist.component';
import { NewDeckComponent } from './components/new-deck/new-deck.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeckSearchComponent } from './components/deck-search/deck-search.component';
import { DeckInfoComponent } from './components/deck-info/deck-info.component';
import { FooterComponent } from './components/footer/footer.component';
import { ModifyDeckComponent } from './components/modify-deck/modify-deck.component';
import { CreateDeckComponent } from './components/create-deck/create-deck.component';
import { DeckModifyComponent } from './components/deck-modify/deck-modify.component';
import { DeckCreateComponent } from './components/deck-create/deck-create.component';
import { DeckFormComponent } from './components/deck-form/deck-form.component';
import { DeckLearnComponent } from './components/deck-learn/deck-learn.component';
import { LearnCardComponent } from './components/learn-card/learn-card.component';
import { DeckQuizComponent } from './components/deck-quiz/deck-quiz.component';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptorService } from './auth-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { QuizResultComponent } from './components/quiz-result/quiz-result.component';
import { QuizResultInfoComponent } from './components/quiz-result-info/quiz-result-info.component';
import { QuizResultListComponent } from './components/quiz-result-list/quiz-result-list.component';





@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    NavbarComponent,
    DeckComponent,
    DecklistComponent,
    NewDeckComponent,
    DeckSearchComponent,
    DeckInfoComponent,
    FooterComponent,
    ModifyDeckComponent,
    CreateDeckComponent,
    DeckModifyComponent,
    DeckCreateComponent,
    DeckFormComponent,
    DeckLearnComponent,
    LearnCardComponent,
    DeckQuizComponent,
    LoginComponent,
    QuizResultComponent,
    QuizResultInfoComponent,
    QuizResultListComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
   
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
