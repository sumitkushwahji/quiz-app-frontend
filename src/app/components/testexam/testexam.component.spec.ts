import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestexamComponent } from './testexam.component';

describe('TestexamComponent', () => {
  let component: TestexamComponent;
  let fixture: ComponentFixture<TestexamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestexamComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestexamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
