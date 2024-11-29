import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttemptTestResultComponent } from './attempt-test-result.component';

describe('AttemptTestResultComponent', () => {
  let component: AttemptTestResultComponent;
  let fixture: ComponentFixture<AttemptTestResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttemptTestResultComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AttemptTestResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
