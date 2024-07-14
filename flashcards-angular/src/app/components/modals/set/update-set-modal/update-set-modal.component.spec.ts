import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSetModalComponent } from './update-set-modal.component';

describe('UpdateSetModalComponent', () => {
  let component: UpdateSetModalComponent;
  let fixture: ComponentFixture<UpdateSetModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UpdateSetModalComponent]
    });
    fixture = TestBed.createComponent(UpdateSetModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
