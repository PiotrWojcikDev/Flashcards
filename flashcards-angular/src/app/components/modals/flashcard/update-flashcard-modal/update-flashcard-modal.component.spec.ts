import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFlashcardModalComponent } from './update-flashcard-modal.component';

describe('UpdateFlashcardModalComponent', () => {
  let component: UpdateFlashcardModalComponent;
  let fixture: ComponentFixture<UpdateFlashcardModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UpdateFlashcardModalComponent]
    });
    fixture = TestBed.createComponent(UpdateFlashcardModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
