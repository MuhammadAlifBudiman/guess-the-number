import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-guess-the-number',
  imports: [CommonModule, FormsModule],
  templateUrl: './guess-the-number.component.html',
  styleUrl: './guess-the-number.component.scss',
})
export class GuessTheNumberComponent {
  secretNumber: number = this.generateRandomNumber();
  attemptsLeft: number = 10;
  guessedNumber?: number;
  feedbackMessage: string = '';
  gameOver: boolean = false;
  isWin: boolean = false;

  private static readonly MAX_NUMBER = 100;
  private static readonly MAX_ATTEMPTS = 10;

  private generateRandomNumber(): number {
    return Math.floor(Math.random() * GuessTheNumberComponent.MAX_NUMBER) + 1;
  }

  public isValidGuess(guess?: number): boolean {
    return (
      guess !== undefined &&
      guess >= 1 &&
      guess <= GuessTheNumberComponent.MAX_NUMBER
    );
  }

  submitGuess(): void {
    if (!this.isValidGuess(this.guessedNumber)) {
      this.feedbackMessage = `Enter a number between 1 and ${GuessTheNumberComponent.MAX_NUMBER}.`;
      return;
    }
    this.attemptsLeft--;
    this.evaluateGuess();
  }

  private evaluateGuess(): void {
    if (this.guessedNumber === this.secretNumber) {
      this.isWin = true;
      this.endGame();
    } else if (this.attemptsLeft === 0) {
      this.isWin = false;
      this.endGame();
    } else {
      this.feedbackMessage =
        this.guessedNumber! > this.secretNumber
          ? 'Too High! Try again.'
          : 'Too low! Try again.';
    }
  }

  private endGame(): void {
    this.gameOver = true;
    this.feedbackMessage = this.isWin
      ? 'Congratulations! You guessed the correct number!'
      : `Game over! The correct number was ${this.secretNumber}`;
  }

  resetGame(): void {
    this.secretNumber = this.generateRandomNumber();
    this.attemptsLeft = GuessTheNumberComponent.MAX_ATTEMPTS;
    this.guessedNumber = undefined;
    this.feedbackMessage = '';
    this.gameOver = false;
  }
}
