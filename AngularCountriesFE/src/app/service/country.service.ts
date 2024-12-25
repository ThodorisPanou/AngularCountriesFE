import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GuessRequest } from '../data/guess-request.model';
import { GuessResponse } from '../data/guess-response.model';
import { StartGameSettings } from '../data/start-game-settings.model';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private CountriesListUrl: string = 'https://localhost:7050/api/CountriesList/GetCountries';
  private MakeGuessUrl: string = 'https://localhost:7050/api/sessions/guess';
  private StartGameURL: string = 'https://localhost:7050/api/startgame/start';

  constructor(private http: HttpClient) { }

  startGame(settings: StartGameSettings): Observable<StartGameSettings> {
    const headers = new HttpHeaders({
      /*'Content-Type': 'application/json',*/
    });
    return this.http.post<StartGameSettings>(this.StartGameURL, settings, { headers }); 
  }

  getCountries(): Observable<any> {
    return this.http.get<any>(this.CountriesListUrl);
  }

  guessCountry(guessData: GuessRequest): Observable<GuessResponse> {
    const headers = new HttpHeaders({
      /*'Content-Type': 'application/json',*/
    });

    return this.http.post<GuessResponse>(this.MakeGuessUrl, guessData, {headers});
  }
}
