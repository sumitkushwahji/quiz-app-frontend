// quiz-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestListComponent } from './components/test-list/test-list.component';
import { TestDetailComponent } from './components/test-detail/test-detail.component';
import { AttemptQuizComponent } from './components/attempt-quiz/attempt-quiz.component';
import { ResultComponent } from './components/result/result.component';
import { QuestionListComponent } from './components/question-list/question-list.component';
import { QuestionDetailComponent } from './components/question-detail/question-detail.component';

const quizRoutes: Routes = [
  { path: '', component: TestListComponent }, // Default route for quiz
  { path: 'test', component: TestListComponent }, // Default route for quiz
  { path: 'test/create', component: TestDetailComponent },
  { path: 'attempt/:id', component: AttemptQuizComponent },
  { path: 'result', component: ResultComponent },
  { path: 'questions/test/:testId', component: QuestionListComponent },
  { path: 'questions/:id', component: QuestionDetailComponent },
  { path: 'test/:id/questions', component: QuestionListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(quizRoutes)],
  exports: [RouterModule],
})
export class QuizRoutingModule {}
