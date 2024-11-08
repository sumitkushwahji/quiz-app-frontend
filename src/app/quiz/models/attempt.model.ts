import { Question } from './question.model';

export interface Attempt {
  testId: number;
  answers: Answer[];
}

export interface Answer {
  questionId: number;
  selectedOptionId: number; // ID of the selected option
}
