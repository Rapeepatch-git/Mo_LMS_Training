import { NextResponse } from 'next/server';
import { getQuizById } from '@/data/quizzes';
import type { QuizSubmission, QuizResult } from '@/types/quiz';

export async function POST(
  req: Request,
  { params }: { params: Promise<{ quizId: string }> }
) {
  const { quizId } = await params;
  const quiz = getQuizById(quizId);
  if (!quiz) return NextResponse.json({ error: 'Quiz not found' }, { status: 404 });

  let body: QuizSubmission;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { answers } = body;
  let correct = 0;

  const breakdown = quiz.questions.map((q) => {
    const selectedIds: string[] = answers[q.id] ?? [];
    const isCorrect =
      q.correctIds.length === selectedIds.length &&
      q.correctIds.every((id) => selectedIds.includes(id));
    if (isCorrect) correct++;
    return {
      questionId: q.id,
      selectedIds,
      correctIds: q.correctIds,
      isCorrect,
      explanation: q.explanation,
    };
  });

  const score = Math.round((correct / quiz.questions.length) * 100);
  const result: QuizResult = {
    quizId,
    score,
    passed: score >= quiz.passingScore,
    total: quiz.questions.length,
    correct,
    breakdown,
  };

  return NextResponse.json(result);
}
