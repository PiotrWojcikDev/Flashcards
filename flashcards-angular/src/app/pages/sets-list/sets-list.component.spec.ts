import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetsListComponent } from './sets-list.component';

describe('SetsListComponent', () => {
  let component: SetsListComponent;
  let fixture: ComponentFixture<SetsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SetsListComponent]
    });
    fixture = TestBed.createComponent(SetsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
