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
  fetchC: boolean = false;
  fetchLoading: boolean = true;

  constructor(private countryService: CountryService) { }

  ngOnInit(): void {
    this.fetchCountries();
  }

  fetchCountries(): void {
    this.countryService.getCountries().subscribe(
      (data) => {
        this.countries = data;
        this.fetchC = true;
      },
      (error) => {
        console.error('Error fetching countries', error);
        this.fetchC = false;
        this.fetchLoading = false;
      }
    );
  }

  makeGuess(): void {
    if (this.countries.includes(this.userInput)) {
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
    else {
      console.log("Country name doesnt exist");
      this.userInput = '';
    }
  }

  playAgain(): void {
    this.sessionid = null;
    this.GuessCount = 1;
    this.userInput = "";
    this.guessedCountries = [];
    this.sucessfullGuess = false;
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
