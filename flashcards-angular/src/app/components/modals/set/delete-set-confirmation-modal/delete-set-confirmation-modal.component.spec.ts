import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSetConfirmationModalComponent } from './delete-set-confirmation-modal.component';

describe('DeleteSetConfirmationModalComponent', () => {
  let component: DeleteSetConfirmationModalComponent;
  let fixture: ComponentFixture<DeleteSetConfirmationModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DeleteSetConfirmationModalComponent]
    });
    fixture = TestBed.createComponent(DeleteSetConfirmationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
