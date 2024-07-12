import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningFinishedModalComponent } from './learning-finished-modal.component';

describe('LearningFinishedModalComponent', () => {
  let component: LearningFinishedModalComponent;
  let fixture: ComponentFixture<LearningFinishedModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LearningFinishedModalComponent]
    });
    fixture = TestBed.createComponent(LearningFinishedModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
