import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DeckInfoComponent } from './components/deck-info/deck-info.component';
import { DeckCreateComponent } from './components/deck-create/deck-create.component';
import { DeckModifyComponent } from './components/deck-modify/deck-modify.component';
import { DeckLearnComponent } from './components/deck-learn/deck-learn.component';
import { DeckQuizComponent } from './components/deck-quiz/deck-quiz.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuardService as AuthGruard} from './services/auth-guard.service';


const routes: Routes = [
  {path: "", redirectTo:"home", pathMatch: 'full' },
  {path: "home", canActivate: [AuthGruard],  component: HomeComponent},
  {path: "profile", canActivate: [AuthGruard], component: ProfileComponent},
  {path: "login", component: LoginComponent},
  {path: "decks", canActivate: [AuthGruard], children:[ 
      {
        path: "info", component: DeckInfoComponent, 
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
