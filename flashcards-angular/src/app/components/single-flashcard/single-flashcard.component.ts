import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DeleteFlashcardConfirmationModalComponent } from '../modals/flashcard/delete-flashcard-confirmation-modal/delete-flashcard-confirmation-modal.component';
import { FlashcardService } from 'src/app/services/flashcard.service';
import { AddFlashcardModalComponent } from '../modals/flashcard/add-flashcard-modal/add-flashcard-modal.component';

@Component({
  selector: 'app-single-flashcard',
  standalone: true,
  imports: [CommonModule, 
    DeleteFlashcardConfirmationModalComponent],
  templateUrl: './single-flashcard.component.html',
  styleUrls: ['./single-flashcard.component.css'],
  providers: [FlashcardService]
})
export class SingleFlashcardComponent {
  @Input() flashcardObj: any;
  @Output() onDelete = new EventEmitter<void>(); 
  @Output() onDeleteCancel = new EventEmitter<void>(); 

  constructor(
    public flashcardService: FlashcardService,
    private router: Router) {}


  editFlashcard(flashcardId: number) {
    // logika do edycji fiszki
    console.log(`Editing flashcard with ID: ${flashcardId}`);
  }

  deleteFlashcard(flashcardId: number) {
    console.log("Delete set" + JSON.stringify(this.flashcardObj));
    this.flashcardService.showDeleteFlashcardConfirmationModal = true;
  }
  deleteCancelAction() {
    console.log("Delete set" + JSON.stringify(this.flashcardObj));
    this.flashcardService.showDeleteFlashcardConfirmationModal = false;
  }
}
