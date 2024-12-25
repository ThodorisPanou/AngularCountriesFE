import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root' // Η υπηρεσία παρέχεται σε όλη την εφαρμογή
})
export class GameSettingsService {

  private difficultySubject = new BehaviorSubject<string>('easy'); 
  private tokenSubject = new BehaviorSubject<string>('');

  // Δημιουργούμε παρατηρητές για τα πεδία
  difficulty$ = this.difficultySubject.asObservable();
  token$ = this.tokenSubject.asObservable();

  constructor() { }

  // Μέθοδοι για να αλλάξουμε τις τιμές
  setDifficulty(difficulty: string): void {
    this.difficultySubject.next(difficulty);
  }

  setToken(token: string): void {
    this.tokenSubject.next(token);
  }

  getDifficulty(): string {
    return this.difficultySubject.getValue();
  }

  getToken(): string {
    return this.tokenSubject.getValue();
  }

}
