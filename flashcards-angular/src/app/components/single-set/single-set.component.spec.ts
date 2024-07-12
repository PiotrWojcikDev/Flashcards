import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleSetComponent } from './single-set.component';

describe('SingleSetComponent', () => {
  let component: SingleSetComponent;
  let fixture: ComponentFixture<SingleSetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SingleSetComponent]
    });
    fixture = TestBed.createComponent(SingleSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
