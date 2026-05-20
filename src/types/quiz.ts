export type QuestionType = 'single' | 'multiple' | 'true-false';

export interface QuizChoice {
  id: string;
  text: string;
}

export interface QuizQuestion {
  id: string;
  type: QuestionType;
  text: string;
  choices: QuizChoice[];
  correctIds: string[];     // revealed only after submission
  explanation?: string;
}

export interface Quiz {
  id: string;
  courseId: string;
  sectionId: string;
  lessonId?: string;        // optional — after specific lesson
  title: string;
  description?: string;
  passingScore: number;     // percentage, e.g. 70
  timeLimit?: number;       // seconds; undefined = no limit
  questions: QuizQuestion[];
}

/** Payload sent by the client to submit answers */
export interface QuizSubmission {
  quizId: string;
  answers: Record<string, string[]>; // questionId → selected choiceIds
}

/** Result returned by the server after grading */
export interface QuizResult {
  quizId: string;
  score: number;           // percentage 0-100
  passed: boolean;
  total: number;
  correct: number;
  breakdown: {
    questionId: string;
    selectedIds: string[];
    correctIds: string[];
    isCorrect: boolean;
    explanation?: string;
  }[];
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  userId: string;
  submittedAt: string;     // ISO date string
  result: QuizResult;
}
