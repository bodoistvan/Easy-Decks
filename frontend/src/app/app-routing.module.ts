import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NewDeckComponent } from './components/new-deck/new-deck.component'
import { DeckInfoComponent } from './components/deck-info/deck-info.component';
import { ModifyDeckComponent } from './components/modify-deck/modify-deck.component';

const routes: Routes = [
  {path: "", redirectTo:"home", pathMatch: 'full' },
  {path: "home", component: HomeComponent},
  {path: "profile", component: ProfileComponent},
  {path: "decks", children:[ 
      {
        path: "info", component: DeckInfoComponent
      },
      {
        path: "create", component: NewDeckComponent
      },
      {
        path: "modify", component: NewDeckComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
