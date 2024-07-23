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
  allFlashcards: Array<any> = [];

  totalFlashcards: number = 0;
  currentFlashcardIndex: number = 0; 
  correctAnswers: number = 0;
  incorrectAnswers: number = 0;


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
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getNextFlashcard() {
    if (this.currentFlashcardIndex < this.allFlashcards.length - 1) {
      this.currentFlashcardIndex++;
    } else {
      const incorrectFlashcards = this.allFlashcards.filter(flashcard => !flashcard.learned);
      if (incorrectFlashcards.length === 0) {
        this.setService.showLearningFinishedModal = true;
      } else {
        this.allFlashcards = [...incorrectFlashcards];
        this.currentFlashcardIndex = 0;
      }
    }
  }

  answerFlashcard(isCorrect: boolean) {
    const currentFlashcard = this.allFlashcards[this.currentFlashcardIndex];
    if (isCorrect) {
      currentFlashcard.learned = true;
      this.correctAnswers++;
    } else {
      this.incorrectAnswers++; 
    }
    this.getNextFlashcard();
  }

  get remainingCards() {
    return this.allFlashcards.filter(f => !f.learned).length;
  }
}
