import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GuessRequest } from '../data/guess-request.model';
import { GuessResponse } from '../data/guess-response.model';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private CountriesListUrl = 'https://localhost:7050/api/CountriesList/GetCountries';
  private MakeGuessUrl = 'https://localhost:7050/api/sessions/guess';

  constructor(private http: HttpClient) { }

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
