import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FlashcardService } from 'src/app/services/flashcard.service';

@Component({
  selector: 'app-add-flashcard-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './add-flashcard-modal.component.html',
  styleUrls: ['./add-flashcard-modal.component.css']
})
export class AddFlashcardModalComponent implements OnInit{
  @Output() onAdd = new EventEmitter(); 
  addFlashcardForm!: FormGroup;
  constructor(
    public flashcardService: FlashcardService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.addFlashcardForm = this.formBuilder.group({
      setId: [this.activatedRoute.snapshot.params['setId'], Validators.required],
      front: ['', Validators.required],
      back: ['', Validators.required]
    });
  }

  addFlashcard() {
    this.flashcardService.addFlashcard(this.addFlashcardForm.value).subscribe({
      next: (res) => {
        this.flashcardService.showAddFlashcardModal = false;
        this.onAdd.emit();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  closeAddModal() {
    this.flashcardService.showAddFlashcardModal = false;
  }
}
