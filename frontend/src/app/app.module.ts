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
    CreateDeckComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
