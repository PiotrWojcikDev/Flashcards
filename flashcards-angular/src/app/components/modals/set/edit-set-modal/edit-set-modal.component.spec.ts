import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSetModalComponent } from './edit-set-modal.component';

describe('EditSetModalComponent', () => {
  let component: EditSetModalComponent;
  let fixture: ComponentFixture<EditSetModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EditSetModalComponent]
    });
    fixture = TestBed.createComponent(EditSetModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
