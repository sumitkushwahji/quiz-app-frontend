// app.routes.ts
import { Routes } from '@angular/router';
import { ContentComponent } from './components/content/content.component';
import { QuestionFormComponent } from './components/question-form/question-form.component';
import { SubjectwisequestionComponent } from './components/subjectwisequestion/subjectwisequestion.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { ExamwisequestionComponent } from './components/examwisequestion/examwisequestion.component';
import { TopicwisequestionComponent } from './components/topicwisequestion/topicwisequestion.component';
import { TestexamComponent } from './components/testexam/testexam.component';

export const routes: Routes = [
  { path: '', component: ContentComponent },
  { path: 'quiz/:subject/:topic/:exam', component: QuizComponent },

  { path: 'add-question', component: QuestionFormComponent },
  { path: 'subject-wise-questions', component: SubjectwisequestionComponent },
  { path: 'exam-wise-questions', component: ExamwisequestionComponent },
  { path: 'topic-wise-questions', component: TopicwisequestionComponent },
  { path: 'test-exam', component: TestexamComponent },
  {
    path: 'users',
    loadChildren: () =>
      import('./user/user-routing.module').then((m) => m.UserRoutingModule),
  },
  {
    path: 'quiz',
    loadChildren: () =>
      import('./quiz/quiz-routing.module').then((m) => m.QuizRoutingModule),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
