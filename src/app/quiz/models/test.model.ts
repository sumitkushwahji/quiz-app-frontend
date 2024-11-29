import { Question } from './question.model';

export interface Test {
  id: number;
  testName: string;
  description: string;
  duration: number; // Duration in minutes
  questions: Question[];
}
