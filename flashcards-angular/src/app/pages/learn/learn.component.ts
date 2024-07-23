import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetService } from 'src/app/services/set.service';
import { LearningFinishedModalComponent } from 'src/app/components/modals/learn/learning-finished-modal/learning-finished-modal.component';
import { ActivatedRoute } from '@angular/router';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';

@Component({
  selector: 'app-learn',
  standalone: true,
  imports: [
    CommonModule, 
    NavbarComponent,
    LearningFinishedModalComponent
  ],
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.css'],
  providers: [SetService]
})
export class LearnComponent {
  totalFlashcards: number = 0;
  currentFlashcardIndex: number = 0; 
  correctAnswers: number = 0;
  incorrectAnswers: number = 0;

  allFlashcards: Array<any> = [];
  correctFlashcards: Array<any> = [];
  incorrectFlashcards: Array<any> = [];

  constructor(
    public setService: SetService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.paramMap.subscribe(params => {
      const setId = params.get('setId'); 
      if (setId) {
        this.getAllFlashcardsBySetId(setId); 
      }
    });
  }

  getAllFlashcardsBySetId(userId: string) {
    this.setService.getAllFlashcardsBySetId(userId)
    .subscribe({
      next: (res) => {
        this.allFlashcards = res.map((flashcard: any) => ({ ...flashcard, learned: false }));
        this.totalFlashcards = this.allFlashcards.length; 
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
      if (this.incorrectFlashcards.length === 0) {
        this.checkCompletion();
      } else {
        this.allFlashcards = [...this.incorrectFlashcards];
        this.incorrectFlashcards = [];
      }
    }
  }
  
  answerFlashcard(isCorrect: boolean) {
    const currentFlashcard = this.allFlashcards[this.currentFlashcardIndex];
  
    if (isCorrect) {
      currentFlashcard.learned = true;
      this.correctAnswers++;
      this.incorrectFlashcards = this.incorrectFlashcards.filter(fc => fc !== currentFlashcard);
    } else {
      if (!this.incorrectFlashcards.includes(currentFlashcard)) {
        this.incorrectAnswers++;
        this.incorrectFlashcards.push(currentFlashcard);
      }
    }
  
    this.getNextFlashcard();
  }
  

  checkCompletion() {
    if (this.remainingCards === 0 && this.incorrectFlashcards.length === 0) {
      this.setService.showLearningFinishedModal = true;
    }
  }

  get remainingCards() {
    return this.allFlashcards.filter(f => !f.learned).length;
  }
}
