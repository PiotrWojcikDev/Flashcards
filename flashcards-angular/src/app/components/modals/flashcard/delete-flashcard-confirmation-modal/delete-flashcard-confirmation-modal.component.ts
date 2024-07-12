import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetService } from 'src/app/services/set.service';
import { FlashcardService } from 'src/app/services/flashcard.service';

@Component({
  selector: 'app-delete-flashcard-confirmation-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-flashcard-confirmation-modal.component.html',
  styleUrls: ['./delete-flashcard-confirmation-modal.component.css'],
  providers: [FlashcardService]
})
export class DeleteFlashcardConfirmationModalComponent {
  @Input() flashcardObj: any;
  @Output() onDelete = new EventEmitter(); 
  @Output() onDeleteCancel = new EventEmitter();

  constructor(public flashcardService: FlashcardService) { }

  deleteFlashcard() {
    this.flashcardService.deleteFlashcard(this.flashcardObj.flashcardId).subscribe({
      next: (res) => {
        this.flashcardService.showDeleteFlashcardConfirmationModal = false;
        this.onDelete.emit();
        console.log("Flashcard deleted successfully");
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  deleteCancelAction() {
    console.log("CANCEL");
    this.onDeleteCancel.emit();
    this.flashcardService.showDeleteFlashcardConfirmationModal=false;
  }
}
