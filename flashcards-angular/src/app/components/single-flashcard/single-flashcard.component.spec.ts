import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleFlashcardComponent } from './single-flashcard.component';

describe('SingleFlashcardComponent', () => {
  let component: SingleFlashcardComponent;
  let fixture: ComponentFixture<SingleFlashcardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SingleFlashcardComponent]
    });
    fixture = TestBed.createComponent(SingleFlashcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
