import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteFlashcardConfirmationModalComponent } from './delete-flashcard-confirmation-modal.component';

describe('DeleteFlashcardConfirmationModalComponent', () => {
  let component: DeleteFlashcardConfirmationModalComponent;
  let fixture: ComponentFixture<DeleteFlashcardConfirmationModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DeleteFlashcardConfirmationModalComponent]
    });
    fixture = TestBed.createComponent(DeleteFlashcardConfirmationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
