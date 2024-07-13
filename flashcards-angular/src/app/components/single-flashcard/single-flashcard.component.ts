import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DeleteFlashcardConfirmationModalComponent } from '../modals/flashcard/delete-flashcard-confirmation-modal/delete-flashcard-confirmation-modal.component';
import { FlashcardService } from 'src/app/services/flashcard.service';
import { AddFlashcardModalComponent } from '../modals/flashcard/add-flashcard-modal/add-flashcard-modal.component';
import { UpdateFlashcardModalComponent } from '../modals/flashcard/update-flashcard-modal/update-flashcard-modal.component';

@Component({
  selector: 'app-single-flashcard',
  standalone: true,
  imports: [
    CommonModule, 
    UpdateFlashcardModalComponent,
    DeleteFlashcardConfirmationModalComponent],
  templateUrl: './single-flashcard.component.html',
  styleUrls: ['./single-flashcard.component.css'],
  providers: [FlashcardService]
})
export class SingleFlashcardComponent {
  @Input() flashcardObj: any;
  @Output() onUpdate = new EventEmitter<void>(); 
  @Output() onDelete = new EventEmitter<void>(); 
  @Output() onDeleteCancel = new EventEmitter<void>(); 

  constructor(
    public flashcardService: FlashcardService,
    private router: Router) {}


  updateFlashcard(flashcardId: number) {
    this.flashcardService.showUpdateFlashcardModal = true;
    console.log(`Editing flashcard with ID: ${flashcardId}`);
  }

  deleteFlashcard(flashcardId: number) {
    this.flashcardService.showDeleteFlashcardConfirmationModal = true;
  }
  deleteCancelAction() {
    this.flashcardService.showDeleteFlashcardConfirmationModal = false;
  }
}
