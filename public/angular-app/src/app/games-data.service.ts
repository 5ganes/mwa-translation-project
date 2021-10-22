import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Game } from './games/games.component';

@Injectable({
  providedIn: 'root'
})
export class GamesDataService {
  private apiBaseUrl = 'http://localhost:3000/api';
  constructor(private http: HttpClient) { }

  public getGames(): Promise<Game[]> {
    const url: string = this.apiBaseUrl + "/games";
    return this.http.get(url).toPromise()
      .then(response => response as Game[])
      .catch(this.handleError);
  }

  public getSingleGame(gameId: string): Promise<Game> {
    const url: string = this.apiBaseUrl + "/games/" + gameId;
    return this.http.get(url).toPromise()
      .then(response => response as Game)
      .catch(this.handleError);
  }

  public addOneGame(game: any) {
    const url: string = this.apiBaseUrl + "/games/add";
    return this.http.post(url, game).toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  public updateOneGame(game: any, gameId: string) {
    const url: string = this.apiBaseUrl + "/games/" + gameId;
    // return this.http.put(url, game).toPromise()
    //   .then(response => response)
    //   .catch(this.handleError);
  }

  public deleteOneGame(gameId: string) {
    const url: string = this.apiBaseUrl + "/games/" + gameId;
    return this.http.delete(url).toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  // public getSingleGame(gameId: string) {
  //   const url: string = this.apiBaseUrl + "/games/" + gameId;
  //   return this.http.get(url);
  // }

  private handleError(error: any): Promise<any> {
    console.log("Something went wrong ", error);
    return Promise.reject(error.message || error);
  }

}
