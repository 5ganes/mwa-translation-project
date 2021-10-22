import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { GamesComponent } from './games/games.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { GameSingleComponent } from './games/game-single/game-single.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AddEditComponent } from './games/add-edit/add-edit.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    GamesComponent,
    WelcomeComponent,
    ErrorPageComponent,
    GameSingleComponent,
    NavBarComponent,
    AddEditComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: "",
        component: WelcomeComponent
      },
      {
        path: "games",
        component: GamesComponent
      },
      {
        path: "games/addeditgame",
        component: AddEditComponent
      },
      {
        path: "games/edit/:gameId",
        component: AddEditComponent
      },
      {
        path: "games/:gameId",
        component: GameSingleComponent
      },
      {
        path: "**",
        component: ErrorPageComponent
      }
    ])
  ],
  exports: [
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
