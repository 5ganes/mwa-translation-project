import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GamesDataService } from '../games-data.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  title = 'Game List';

  games: any;

  constructor(private service: GamesDataService, private router: Router) {
  }

  ngOnInit(): void {
    this.service.getGames().then(response => {
      this.games = response;
    })
  }

  deleteGame(gameId: string) {
    console.log(gameId);
    this.service.deleteOneGame(gameId).then(response => {
      this.router.navigate(['/games']);
    })
  }

}

export class Game {
  title!: string;
  price!: number;
  year!: number;
}
