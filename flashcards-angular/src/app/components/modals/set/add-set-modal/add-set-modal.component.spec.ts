import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSetModalComponent } from './add-set-modal.component';

describe('AddSetModalComponent', () => {
  let component: AddSetModalComponent;
  let fixture: ComponentFixture<AddSetModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddSetModalComponent]
    });
    fixture = TestBed.createComponent(AddSetModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
