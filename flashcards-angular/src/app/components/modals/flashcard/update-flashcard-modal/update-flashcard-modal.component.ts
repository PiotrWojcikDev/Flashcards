import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FlashcardService } from 'src/app/services/flashcard.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-flashcard-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-flashcard-modal.component.html',
  styleUrls: ['./update-flashcard-modal.component.css']
})
export class UpdateFlashcardModalComponent {
  @Input() flashcardObj: any;
  @Output() onUpdate = new EventEmitter(); 
  updateFlashcardForm!: FormGroup;
  constructor(
    public flashcardService: FlashcardService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.updateFlashcardForm = this.formBuilder.group({
      flashcardId: this.flashcardObj.flashcardId,
      front: ['', Validators.required],
      back: ['', Validators.required],
      setId: [this.activatedRoute.snapshot.params['setId'], Validators.required]
    });
  }

  updateFlashcard() {
    this.flashcardService.updateFlashcard(this.updateFlashcardForm.value)
    .subscribe({
      next: (res) => {
        this.flashcardService.showUpdateFlashcardModal = false;
        this.onUpdate.emit();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  closeUpdateModal() {
    this.flashcardService.showUpdateFlashcardModal = false;
  }
}
