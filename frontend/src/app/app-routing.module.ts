import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DeckInfoComponent } from './components/deck-info/deck-info.component';
import { DeckCreateComponent } from './components/deck-create/deck-create.component';
import { DeckModifyComponent } from './components/deck-modify/deck-modify.component';
import { DeckLearnComponent } from './components/deck-learn/deck-learn.component';
import { DeckQuizComponent } from './components/deck-quiz/deck-quiz.component';

const routes: Routes = [
  {path: "", redirectTo:"home", pathMatch: 'full' },
  {path: "home", component: HomeComponent},
  {path: "profile", component: ProfileComponent},
  {path: "decks", children:[ 
      {
        path: "info", component: DeckInfoComponent
      },
      {
        path: "create", component: DeckCreateComponent
      },
      {
        path: "modify", component: DeckModifyComponent
      },
      {
        path: "learn", component: DeckLearnComponent
      },
      {
        path: "quiz", component: DeckQuizComponent
      }
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
