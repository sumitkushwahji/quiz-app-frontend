import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { QuestionFormComponent } from './components/question-form/question-form.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { SumitModule } from './sumit.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    QuestionFormComponent,
    QuizComponent,
    SumitModule,
    SidebarComponent,
    HeaderComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'quiz-app-frontend';
}
