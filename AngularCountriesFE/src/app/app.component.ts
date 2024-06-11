import { Component, OnInit } from '@angular/core';
import { CountryService } from './country.service';
import { GuessRequest } from './guess-request.model';
import { GuessResponse } from './guess-response.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  userInput: string = '';
  countries: any[] = [];
  guessedCountries: GuessResponse[] = [];
  sessionid: string|null = null;
  GuessCount: number = 1;
  response: GuessResponse | null = null;
  sucessfullGuess: boolean = false;

  constructor(private countryService: CountryService) { }

  ngOnInit(): void {
    this.fetchCountries();
  }

  fetchCountries(): void {
    this.countryService.getCountries().subscribe(
      (data) => {
        this.countries = data;
      },
      (error) => {
        console.error('Error fetching countries', error);
      }
    );
  }

  makeGuess(): void {
    var guess = new GuessRequest(this.sessionid, this.userInput, this.GuessCount);
    this.countryService.guessCountry(guess).subscribe(
      (data: GuessResponse) => {
        this.response = data;
        this.sessionid = this.response.sessionID;
        this.GuessCount = this.response.guessCount;
        this.userInput = "";
        this.guessedCountries.push(this.response);
        this.sucessfullGuess = this.response.success;
      },
      (error) => {
        console.error('Error receiving response', error);
      }
    );
  }

  getResponseClass(response: number): string {
    if (response === 0) {
      return 'correct';
    } else if (response === 1) {
      return 'guess-lower';
    } else if (response === -1) {
      return 'guess-higher';
    } else {
      return '';
    }
  }

  getResponseIconBool(response: boolean): string {
    if (response) {
      return '✓';
    }
    else
      return '❌';
  }

  getResponseIcon(response: number): string {
    if (response === -1) {
      return '↓';
    } else if (response === 1) {
      return '🠅';
    } else {
      return '✓';
    }
  }

  
}
