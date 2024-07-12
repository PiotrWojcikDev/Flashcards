import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetService } from 'src/app/services/set.service';
import { LearningFinishedModalComponent } from 'src/app/components/modals/learn/learning-finished-modal/learning-finished-modal.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-learn',
  standalone: true,
  imports: [CommonModule, LearningFinishedModalComponent],
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.css'],
  providers: [SetService]
})
export class LearnComponent {
  totalFlashcards: number = 0;
  currentFlashcardIndex: number = 0; 
  correctAnswers: number = 0;
  inCorrectAnswers: number = 0;

  allFlashcards: Array<any> = [];
  correctFlashcards: Array<any> = [];
  inCorrectFlashcards: Array<any> = [];

  constructor(
    public setService: SetService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.paramMap.subscribe(params => {
      const setId = params.get('setId'); // Pobierz 'setId' z parametrów URL
      if (setId) {
        this.getAllFlashcardsBySetId(setId); // Użyj 'setId' do pobrania fiszek
      }
    });
  }

  getAllFlashcardsBySetId(userId: string) {
    this.setService.getAllFlashcardsBySetId(userId)
    .subscribe({
      next: (res) => {
        this.allFlashcards = res.map((flashcard: any) => ({ ...flashcard, learned: false }));
        this.totalFlashcards = this.allFlashcards.length; // Ustaw całkowitą liczbę fiszek
        console.log(this.allFlashcards);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getNextFlashcard() {
    this.currentFlashcardIndex++;
    if (this.currentFlashcardIndex >= this.allFlashcards.length) {
      this.currentFlashcardIndex = 0;
      if (this.inCorrectFlashcards.length === 0) {
        console.log("Wszystkie odpowiedzi są już poprawne.");
        this.checkCompletion();

        // Można zresetować naukę lub poinformować użytkownika o zakończeniu
      } else {
        // Rozpocznij przejście przez niepoprawne odpowiedzi
        this.allFlashcards = [...this.inCorrectFlashcards];
        this.inCorrectFlashcards = [];
      }
    }
  }
  
  

  answerFlashcard(isCorrect: boolean) {
    const currentFlashcard = this.allFlashcards[this.currentFlashcardIndex];
  
    if (isCorrect) {
      currentFlashcard.learned = true;
      this.correctAnswers++;
      // Usuń fiszkę z listy niepoprawnych odpowiedzi
      this.inCorrectFlashcards = this.inCorrectFlashcards.filter(fc => fc !== currentFlashcard);
    } else {
      if (!this.inCorrectFlashcards.includes(currentFlashcard)) {
        this.inCorrectAnswers++;
        this.inCorrectFlashcards.push(currentFlashcard);
      }
    }
  
    this.getNextFlashcard();
  }
  

  checkCompletion() {
    if (this.remainingCards === 0 && this.inCorrectFlashcards.length === 0) {
      console.log('Gratulacje! Wszystkie fiszki zostały nauczone.');
      this.setService.showLearningFinishedModal = true;
      // Tu możesz zresetować stan lub zaoferować powtórkę.
    }
  }

  get remainingCards() {
    return this.allFlashcards.filter(f => !f.learned).length;
  }
}
