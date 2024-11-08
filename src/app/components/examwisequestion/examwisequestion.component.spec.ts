import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamwisequestionComponent } from './examwisequestion.component';

describe('ExamwisequestionComponent', () => {
  let component: ExamwisequestionComponent;
  let fixture: ComponentFixture<ExamwisequestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamwisequestionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExamwisequestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
