import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameSettingsService } from '../service/game-settings.service'; // Εισαγωγή της υπηρεσίας
import { CountryService } from '../service/country.service';
import { StartGameSettings } from '../data/start-game-settings.model';


@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  constructor(private router: Router,
    private gameSettingsService: GameSettingsService,
    private countryService: CountryService) { }

  selectedDifficulty: string = '';
  access_token: string = '';

  ngOnInit(): void {
    this.gameSettingsService.difficulty$.subscribe(difficulty => {
      this.selectedDifficulty = difficulty;
    });
    this.gameSettingsService.token$.subscribe(token => {
      this.access_token = token;
    });
  }

  selectDifficulty(difficulty: string) {
    this.gameSettingsService.setDifficulty(difficulty);
    console.log('Difficulty:', this.selectedDifficulty);
  }

  startGame() {
    if (this.selectedDifficulty) {
      var settings = new StartGameSettings(this.selectedDifficulty,""); 
      this.countryService.startGame(settings).subscribe(
        (data) => {
          console.log("in startgame(): token is " + data.accessToken);
          this.gameSettingsService.setToken(data.accessToken ?? "");
          this.router.navigate(['/guess']);
        },
        (error) => {
          console.error('Error starting game', error);
        }
      );
    } else {
      alert('Please select a difficulty!');
    }
  }
}
