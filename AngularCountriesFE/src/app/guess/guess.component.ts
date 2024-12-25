import { Component, OnInit } from '@angular/core';
import { GuessResponse } from '../data/guess-response.model';
import { CountryService } from '../service/country.service';
import { GuessRequest } from '../data/guess-request.model';
import { GameSettingsService } from '../service/game-settings.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-guess',
  templateUrl: './guess.component.html',
  styleUrl: './guess.component.css'
})
export class GuessComponent implements OnInit {
  userInput: string = '';
  countries: any[] = [];
  guessedCountries: GuessResponse[] = [];
  sessionid: string ="";
  GuessCount: number = 0;
  MaxGuess: number = 6;
  response: GuessResponse | null = null;
  sucessfullGuess: boolean = false;
  fetchC: boolean = false;
  fetchLoading: boolean = true;
  guessClosed: boolean = (this.GuessCount > this.MaxGuess) || (this.sucessfullGuess);

  constructor(private countryService: CountryService,
    private gameSettingsService: GameSettingsService,
    private router: Router) { }

  ngOnInit(): void {
    this.sessionid = this.gameSettingsService.getToken();
    console.log("session id: " + this.sessionid);
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
    this.router.navigate(['/start']);
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

