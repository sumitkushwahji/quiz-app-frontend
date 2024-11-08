import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectwisequestionComponent } from './subjectwisequestion.component';

describe('SubjectwisequestionComponent', () => {
  let component: SubjectwisequestionComponent;
  let fixture: ComponentFixture<SubjectwisequestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubjectwisequestionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubjectwisequestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
