// question.model.ts

import { Option } from './option.model'; // Import the Option interface

export enum QuestionType {
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  TRUE_FALSE = 'TRUE_FALSE',
  SHORT_ANSWER = 'SHORT_ANSWER',
}

export interface Question {
  id: number;
  text: string;
  explanation: string;
  subject: string;
  topic: string;
  exam: string;
  questionType: QuestionType;
  difficulty: string;
  options: Option[];
}
