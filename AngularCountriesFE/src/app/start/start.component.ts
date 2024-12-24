import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent {

  constructor(private router: Router) { }

  selectedDifficulty: string = ''; 

  selectDifficulty(difficulty: string) {
    this.selectedDifficulty = difficulty;
  }

  startGame() {
    if (this.selectedDifficulty) {
      console.log('Selected Difficulty:', this.selectedDifficulty);
      this.router.navigate(['/guess']);
    } else {
      alert('Please select a difficulty!');
    }
  }
}
