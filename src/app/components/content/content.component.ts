import { Component } from '@angular/core';
import { QuizComponent } from '../quiz/quiz.component';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [QuizComponent],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css',
})
export class ContentComponent {}
