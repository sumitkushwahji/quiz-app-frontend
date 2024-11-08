// question.model.ts

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

export interface Option {
  text: string;
  isCorrect: boolean;
}
