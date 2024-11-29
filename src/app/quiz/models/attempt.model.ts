import { Question } from './question.model';

export interface Attempt {
  testId: number;
  answers: { questionId: number; selectedOptionId: number }[];
  score?: number;
}
export interface Answer {
  questionId: number;
  selectedOptionId: number; // ID of the selected option
}
