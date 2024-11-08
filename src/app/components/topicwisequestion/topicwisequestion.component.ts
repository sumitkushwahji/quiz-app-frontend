import { Component, OnInit } from '@angular/core';
import { SumitModule } from '../../sumit.module';
import { QuestionService } from '../../services/question.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topicwisequestion',
  standalone: true,
  imports: [SumitModule],
  templateUrl: './topicwisequestion.component.html',
  styleUrl: './topicwisequestion.component.css',
})
export class TopicwisequestionComponent implements OnInit {
  topics: any[] = []; // Array to hold fetched topics

  constructor(
    private questionService: QuestionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.questionService.getTopics().subscribe(
      (data) => {
        this.topics = data; // Assign the fetched data to topics array
        console.log(data);
        console.log(this.topics);
      },
      (error) => {
        console.error('Error fetching topics:', error);
      }
    );
  }
  // Triggered when a subject is clicked
  onTopicClick(topic: any): void {
    // Navigate to the new component with the selected subject's ID
    this.router.navigate(['/quiz', '', topic, '']);
  }

  // Handle hover event to apply custom styles
  onHover(subject: any): void {
    subject.isHovered = true;
  }

  // Handle mouse leave event
  onLeave(subject: any): void {
    subject.isHovered = false;
  }
}
