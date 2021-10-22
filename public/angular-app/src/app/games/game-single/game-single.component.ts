import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { GamesDataService } from 'src/app/games-data.service';
import { Game } from '../games.component';

@Component({
  selector: 'app-game-single',
  templateUrl: './game-single.component.html',
  styleUrls: ['./game-single.component.css']
})
export class GameSingleComponent implements OnInit {
  title = "Game Single";
  game: any;

  gameId: any;
  gameStars: any;

  constructor(private service: GamesDataService, private route: ActivatedRoute) {
    route.paramMap.subscribe(params => {
      this.gameId = params.get('gameId');
      console.log(this.gameId);
    });
  }

  ngOnInit(): void {
    this.service.getSingleGame(this.gameId).then(response => {
      this.game = response;
      this.gameStars = new Array(parseInt(this.game.rate));
      console.log(this.gameStars);
    });
  }

}
