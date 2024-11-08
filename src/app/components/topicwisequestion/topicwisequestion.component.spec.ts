import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicwisequestionComponent } from './topicwisequestion.component';

describe('TopicwisequestionComponent', () => {
  let component: TopicwisequestionComponent;
  let fixture: ComponentFixture<TopicwisequestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopicwisequestionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopicwisequestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
