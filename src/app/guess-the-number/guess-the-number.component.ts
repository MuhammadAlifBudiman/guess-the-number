// This component implements a simple Guess the Number game.
// Users try to guess a randomly generated number between 1 and 100 within 10 attempts.
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

/**
 * GuessTheNumberComponent
 *
 * @description
 * Angular component for a "Guess the Number" game. The user has 10 attempts to guess a secret number between 1 and 100.
 * The component provides feedback after each guess and displays a win/lose message when the game ends.
 */
@Component({
  selector: 'app-guess-the-number', // Component selector for use in templates
  imports: [CommonModule, FormsModule], // Importing required Angular modules
  templateUrl: './guess-the-number.component.html', // HTML template for the component
  styleUrl: './guess-the-number.component.scss', // SCSS styles for the component
})
export class GuessTheNumberComponent {
  /**
   * The secret number to be guessed, randomly generated at the start of the game or on reset.
   */
  secretNumber: number = this.generateRandomNumber();

  /**
   * Number of attempts left for the user to guess the number.
   */
  attemptsLeft: number = 10;

  /**
   * The user's current guess. Bound to the input field in the template.
   */
  guessedNumber?: number;

  /**
   * Feedback message displayed to the user after each guess or at game end.
   */
  feedbackMessage: string = '';

  /**
   * Indicates if the game is over (win or lose).
   */
  gameOver: boolean = false;

  /**
   * Indicates if the user has won the game.
   */
  isWin: boolean = false;

  /**
   * The maximum number the secret number can be.
   */
  private static readonly MAX_NUMBER = 100;

  /**
   * The maximum number of attempts allowed per game.
   */
  private static readonly MAX_ATTEMPTS = 10;

  /**
   * Generates a random integer between 1 and MAX_NUMBER (inclusive).
   * @returns {number} The randomly generated secret number.
   */
  private generateRandomNumber(): number {
    return Math.floor(Math.random() * GuessTheNumberComponent.MAX_NUMBER) + 1;
  }

  /**
   * Checks if the provided guess is valid (between 1 and MAX_NUMBER).
   * @param guess The number to validate.
   * @returns {boolean} True if the guess is valid, false otherwise.
   */
  public isValidGuess(guess?: number): boolean {
    return (
      guess !== undefined &&
      guess >= 1 &&
      guess <= GuessTheNumberComponent.MAX_NUMBER
    );
  }

  /**
   * Handles the user's guess submission.
   * Validates the guess, updates attempts, and evaluates the guess.
   */
  submitGuess(): void {
    if (!this.isValidGuess(this.guessedNumber)) {
      this.feedbackMessage = `Enter a number between 1 and ${GuessTheNumberComponent.MAX_NUMBER}.`;
      return;
    }
    this.attemptsLeft--;
    this.evaluateGuess();
  }

  /**
   * Evaluates the user's guess and updates the game state and feedback message.
   * Sets win/lose state and ends the game if necessary.
   */
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

  /**
   * Ends the game and sets the final feedback message based on win/lose state.
   */
  private endGame(): void {
    this.gameOver = true;
    this.feedbackMessage = this.isWin
      ? 'Congratulations! You guessed the correct number!'
      : `Game over! The correct number was ${this.secretNumber}`;
  }

  /**
   * Resets the game state to start a new game.
   * Generates a new secret number, resets attempts, feedback, and win/gameOver flags.
   */
  resetGame(): void {
    this.secretNumber = this.generateRandomNumber();
    this.attemptsLeft = GuessTheNumberComponent.MAX_ATTEMPTS;
    this.guessedNumber = undefined;
    this.feedbackMessage = '';
    this.gameOver = false;
  }
}
