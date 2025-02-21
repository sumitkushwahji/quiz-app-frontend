// app.routes.ts
import { Routes } from '@angular/router';
import { ContentComponent } from './components/content/content.component';
import { QuestionFormComponent } from './components/question-form/question-form.component';
import { SubjectwisequestionComponent } from './components/subjectwisequestion/subjectwisequestion.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { ExamwisequestionComponent } from './components/examwisequestion/examwisequestion.component';
import { TopicwisequestionComponent } from './components/topicwisequestion/topicwisequestion.component';
import { TestexamComponent } from './components/testexam/testexam.component';
import { TestsComponent } from './components/tests/tests.component';
import { AttemptComponent } from './components/attempt/attempt.component';
import { ResultComponent } from './components/result/result.component';
import { AdminStatisticsComponent } from './components/admin-statistics/admin-statistics.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LandingComponent } from './landing/landing/landing.component';
import { LayoutComponent } from './layout/layout/layout.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'home', component: ContentComponent },
      { path: 'quiz/:subject/:topic/:exam', component: QuizComponent },
      { path: 'add-question', component: QuestionFormComponent },
      {
        path: 'subject-wise-questions',
        component: SubjectwisequestionComponent,
      },
      { path: 'exam-wise-questions', component: ExamwisequestionComponent },
      { path: 'topic-wise-questions', component: TopicwisequestionComponent },
      { path: 'test-exam', component: TestexamComponent },
      { path: 'test-list', component: TestsComponent },
      { path: 'attempt/:id', component: AttemptComponent },
      { path: 'result/:id', component: ResultComponent },
      { path: 'statistics', component: AdminStatisticsComponent },
    ],
  },
  { path: '**', redirectTo: '' }, // Redirect unknown paths to Landing

  // { path: 'dashboard', component: ContentComponent },
  // { path: 'quiz/:subject/:topic/:exam', component: QuizComponent },

  // { path: 'add-question', component: QuestionFormComponent },
  // { path: 'subject-wise-questions', component: SubjectwisequestionComponent },
  // { path: 'exam-wise-questions', component: ExamwisequestionComponent },
  // { path: 'topic-wise-questions', component: TopicwisequestionComponent },
  // { path: 'test-exam', component: TestexamComponent },
  // { path: 'test-list', component: TestsComponent },
  // { path: 'attempt/:id', component: AttemptComponent },
  // { path: 'result/:id', component: ResultComponent },
  // { path: 'statistics', component: AdminStatisticsComponent },
];
