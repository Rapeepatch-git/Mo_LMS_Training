import { NextResponse } from 'next/server';
import { getQuizById } from '@/data/quizzes';
import type { Quiz, QuizQuestion } from '@/types/quiz';

/** Strip correctIds before sending to client */
function sanitize(quiz: Quiz): Omit<Quiz, 'questions'> & { questions: Omit<QuizQuestion, 'correctIds'>[] } {
  return {
    ...quiz,
    questions: quiz.questions.map(({ correctIds: _c, ...rest }) => rest),
  };
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ quizId: string }> }
) {
  const { quizId } = await params;
  const quiz = getQuizById(quizId);
  if (!quiz) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(sanitize(quiz));
}
