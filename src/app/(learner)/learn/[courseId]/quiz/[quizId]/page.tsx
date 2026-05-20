'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import Logo from '@/components/ui/Logo';
import Icon from '@/components/ui/Icon';
import { QUIZZES } from '@/data/quizzes';
import { getCourseBySlug } from '@/data/courses';
import type { Quiz, QuizResult } from '@/types/quiz';

type Stage = 'intro' | 'taking' | 'result';

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function QuizPage() {
  const params = useParams<{ courseId: string; quizId: string }>();
  const router = useRouter();

  const quiz = QUIZZES.find((q) => q.id === params.quizId);
  const course = getCourseBySlug(params.courseId);

  const [stage, setStage] = useState<Stage>('intro');
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [result, setResult] = useState<QuizResult | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [currentIdx, setCurrentIdx] = useState(0);

  // Countdown timer
  useEffect(() => {
    if (stage !== 'taking' || !quiz?.timeLimit) return;
    setTimeLeft(quiz.timeLimit);
  }, [stage, quiz?.timeLimit]);

  const handleTimeUp = useCallback(() => {
    handleSubmit(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answers]);

  useEffect(() => {
    if (timeLeft === null || stage !== 'taking') return;
    if (timeLeft <= 0) { handleTimeUp(); return; }
    const t = setTimeout(() => setTimeLeft((s) => (s ?? 1) - 1), 1000);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, stage]);

  if (!quiz) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center">
        <div className="text-center">
          <p className="text-ink-3 mb-4">ไม่พบข้อสอบนี้</p>
          <Link href={`/learn/${params.courseId}/l-001`} className="text-coral hover:underline">
            กลับไปบทเรียน
          </Link>
        </div>
      </div>
    );
  }

  function toggleChoice(questionId: string, choiceId: string, type: string) {
    setAnswers((prev) => {
      const current = prev[questionId] ?? [];
      if (type === 'single' || type === 'true-false') {
        return { ...prev, [questionId]: [choiceId] };
      }
      // multiple
      if (current.includes(choiceId)) {
        return { ...prev, [questionId]: current.filter((id) => id !== choiceId) };
      }
      return { ...prev, [questionId]: [...current, choiceId] };
    });
  }

  async function handleSubmit(timeUp = false) {
    if (submitting) return;
    setSubmitting(true);

    // Grade locally (API route mirrors this logic)
    let correct = 0;
    const breakdown = quiz.questions.map((q) => {
      const selected = answers[q.id] ?? [];
      const isCorrect =
        q.correctIds.length === selected.length &&
        q.correctIds.every((id) => selected.includes(id));
      if (isCorrect) correct++;
      return { questionId: q.id, selectedIds: selected, correctIds: q.correctIds, isCorrect, explanation: q.explanation };
    });

    const score = Math.round((correct / quiz.questions.length) * 100);
    const quizResult: QuizResult = {
      quizId: quiz.id,
      score,
      passed: score >= quiz.passingScore,
      total: quiz.questions.length,
      correct,
      breakdown,
    };

    // Persist to API (best-effort)
    try {
      await fetch(`/api/quiz/${quiz.id}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quizId: quiz.id, answers }),
      });
    } catch { /* ignore */ }

    setResult(quizResult);
    setStage('result');
    setSubmitting(false);
    if (timeUp) setTimeLeft(0);
  }

  const answeredCount = Object.keys(answers).length;
  const totalQuestions = quiz.questions.length;
  const currentQ = quiz.questions[currentIdx];

  // ── INTRO ──────────────────────────────────────────────────────────────────
  if (stage === 'intro') {
    return (
      <div className="min-h-screen bg-paper flex flex-col">
        {/* Header */}
        <header className="h-14 border-b border-line flex items-center px-6 gap-4">
          <Logo size={22} href={`/courses/${params.courseId}`} />
          <span className="text-ink-4 text-xs">›</span>
          <span className="text-sm text-ink-3 truncate">{course?.title ?? params.courseId}</span>
        </header>

        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-lg">
            <div className="bg-white border border-line rounded-card p-8 text-center">
              <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-5">
                <Icon name="book" size={26} color="#c9a14a" />
              </div>
              <div className="font-mono text-[10px] text-coral uppercase tracking-widest mb-2">แบบทดสอบ</div>
              <h1 className="serif text-2xl font-medium text-ink mb-2 leading-snug">{quiz.title}</h1>
              {quiz.description && (
                <p className="text-sm text-ink-3 mb-6">{quiz.description}</p>
              )}

              <div className="flex justify-center gap-6 text-sm text-ink-3 mb-8">
                <span className="inline-flex items-center gap-1.5">
                  <Icon name="book" size={14} color="currentColor" />
                  {quiz.questions.length} ข้อ
                </span>
                {quiz.timeLimit && (
                  <span className="inline-flex items-center gap-1.5">
                    <Icon name="clock" size={14} color="currentColor" />
                    {formatTime(quiz.timeLimit)}
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5">
                  <Icon name="check" size={14} color="currentColor" />
                  ผ่าน {quiz.passingScore}%
                </span>
              </div>

              <button
                onClick={() => setStage('taking')}
                className="w-full h-11 bg-coral text-white rounded-control font-medium hover:bg-coral-dark transition-colors"
              >
                เริ่มทำแบบทดสอบ
              </button>
              <Link
                href={`/learn/${params.courseId}/l-001`}
                className="mt-3 block text-sm text-ink-4 hover:text-coral transition-colors"
              >
                กลับไปบทเรียน
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── RESULT ─────────────────────────────────────────────────────────────────
  if (stage === 'result' && result) {
    const passed = result.passed;
    return (
      <div className="min-h-screen bg-paper flex flex-col">
        <header className="h-14 border-b border-line flex items-center px-6 gap-4">
          <Logo size={22} href={`/courses/${params.courseId}`} />
          <span className="text-ink-4 text-xs">›</span>
          <span className="text-sm text-ink-3 truncate">{quiz.title}</span>
        </header>

        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-2xl space-y-6">
            {/* Score card */}
            <div className={`rounded-card p-8 text-center ${passed ? 'bg-sage-soft border border-sage/30' : 'bg-red-50 border border-red-200'}`}>
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${passed ? 'bg-sage/20' : 'bg-red-100'}`}>
                <Icon name={passed ? 'check' : 'x-circle'} size={30} color={passed ? '#6a8f6a' : '#d4623f'} strokeWidth={2} />
              </div>
              <div className={`serif text-5xl font-medium mb-1 ${passed ? 'text-sage' : 'text-coral'}`}>
                {result.score}%
              </div>
              <div className="text-lg font-medium text-ink mb-1">
                {passed ? 'ผ่านแล้ว! ยินดีด้วย' : 'ยังไม่ผ่าน ลองใหม่ได้เลย'}
              </div>
              <div className="text-sm text-ink-3">
                ตอบถูก {result.correct} จาก {result.total} ข้อ · เกณฑ์ผ่าน {quiz.passingScore}%
              </div>
            </div>

            {/* Breakdown */}
            <div className="bg-white border border-line rounded-card divide-y divide-line">
              <div className="px-6 py-4 flex items-center gap-2">
                <Icon name="book" size={15} color="#5a6275" />
                <h2 className="font-medium text-ink text-sm">เฉลยข้อสอบ</h2>
              </div>
              {quiz.questions.map((q, idx) => {
                const bd = result.breakdown[idx];
                return (
                  <div key={q.id} className="px-6 py-5">
                    <div className="flex items-start gap-3 mb-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${bd.isCorrect ? 'bg-sage/20' : 'bg-coral/10'}`}>
                        <Icon name={bd.isCorrect ? 'check' : 'x-circle'} size={11} color={bd.isCorrect ? '#6a8f6a' : '#d4623f'} strokeWidth={2.5} />
                      </div>
                      <p className="text-sm text-ink font-medium leading-snug">
                        ข้อ {idx + 1}. {q.text}
                      </p>
                    </div>

                    <div className="ml-8 space-y-1.5 mb-3">
                      {q.choices.map((c) => {
                        const isCorrect = q.correctIds.includes(c.id);
                        const isSelected = bd.selectedIds.includes(c.id);
                        let cls = 'text-ink-4';
                        if (isCorrect) cls = 'text-sage font-medium';
                        else if (isSelected && !isCorrect) cls = 'text-coral line-through';
                        return (
                          <div key={c.id} className={`text-xs flex items-center gap-2 ${cls}`}>
                            {isCorrect ? <Icon name="check" size={11} color="#6a8f6a" /> : isSelected ? <Icon name="x-circle" size={11} color="#d4623f" /> : <span className="w-3" />}
                            {c.text}
                          </div>
                        );
                      })}
                    </div>

                    {q.explanation && (
                      <div className="ml-8 bg-cream-2 rounded-[8px] px-3 py-2 text-xs text-ink-3 leading-relaxed">
                        {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              {!passed && (
                <button
                  onClick={() => { setAnswers({}); setCurrentIdx(0); setResult(null); setStage('intro'); }}
                  className="flex-1 h-11 border border-line rounded-control text-sm font-medium text-ink hover:bg-cream transition-colors"
                >
                  ลองใหม่
                </button>
              )}
              <Link
                href={`/learn/${params.courseId}/l-001`}
                className="flex-1 h-11 bg-coral text-white rounded-control font-medium hover:bg-coral-dark transition-colors inline-flex items-center justify-center gap-2"
              >
                {passed ? 'เรียนบทต่อไป' : 'กลับไปทบทวน'}
                <Icon name="arrow-right" size={15} color="#fff" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── TAKING ─────────────────────────────────────────────────────────────────
  const progress = (answeredCount / totalQuestions) * 100;
  const selectedForCurrent = answers[currentQ.id] ?? [];
  const isLastQuestion = currentIdx === totalQuestions - 1;

  return (
    <div className="min-h-screen bg-paper flex flex-col">
      {/* Header */}
      <header className="h-14 border-b border-line flex items-center px-6 gap-4 sticky top-0 bg-paper z-10">
        <Logo size={22} href={`/courses/${params.courseId}`} />
        <div className="flex-1 h-1.5 bg-line rounded-full mx-4">
          <div
            className="h-full bg-coral rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-xs text-ink-3 shrink-0">{answeredCount}/{totalQuestions} ข้อ</span>
        {timeLeft !== null && (
          <span className={`font-mono text-xs px-2 py-1 rounded ${timeLeft < 60 ? 'bg-coral/10 text-coral' : 'bg-cream text-ink-3'}`}>
            {formatTime(timeLeft)}
          </span>
        )}
      </header>

      {/* Question */}
      <div className="flex-1 flex items-start justify-center px-4 py-10">
        <div className="w-full max-w-2xl">
          {/* Question counter nav */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {quiz.questions.map((q, i) => (
              <button
                key={q.id}
                onClick={() => setCurrentIdx(i)}
                className={`w-8 h-8 rounded-[6px] text-xs font-medium transition-colors ${
                  i === currentIdx
                    ? 'bg-ink text-paper'
                    : answers[q.id]
                    ? 'bg-coral/15 text-coral border border-coral/30'
                    : 'bg-cream text-ink-3 border border-line hover:border-ink-3'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <div className="bg-white border border-line rounded-card p-7">
            <div className="font-mono text-[10px] text-ink-4 uppercase tracking-widest mb-3">
              ข้อ {currentIdx + 1} / {totalQuestions}
              {currentQ.type === 'multiple' && (
                <span className="ml-2 text-coral">(เลือกได้หลายข้อ)</span>
              )}
            </div>
            <p className="text-ink font-medium text-base leading-relaxed mb-6">{currentQ.text}</p>

            <div className="space-y-3">
              {currentQ.choices.map((choice) => {
                const isSelected = selectedForCurrent.includes(choice.id);
                return (
                  <button
                    key={choice.id}
                    onClick={() => toggleChoice(currentQ.id, choice.id, currentQ.type)}
                    className={`w-full text-left flex items-center gap-3 px-4 py-3.5 rounded-[10px] border transition-all ${
                      isSelected
                        ? 'border-coral bg-coral/5 text-ink'
                        : 'border-line hover:border-ink-3 text-ink-3'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                      isSelected ? 'border-coral bg-coral' : 'border-line'
                    } ${currentQ.type === 'multiple' ? 'rounded-[4px]' : ''}`}>
                      {isSelected && <Icon name="check" size={10} color="#fff" strokeWidth={3} />}
                    </div>
                    <span className="text-sm">{choice.text}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-3 mt-5">
            <button
              onClick={() => setCurrentIdx((i) => Math.max(0, i - 1))}
              disabled={currentIdx === 0}
              className="h-10 px-4 border border-line rounded-control text-sm text-ink-3 hover:bg-cream transition-colors disabled:opacity-30"
            >
              ← ก่อนหน้า
            </button>

            {isLastQuestion ? (
              <button
                onClick={() => handleSubmit()}
                disabled={submitting}
                className="flex-1 h-10 bg-coral text-white rounded-control font-medium hover:bg-coral-dark transition-colors disabled:opacity-60"
              >
                {submitting ? 'กำลังส่ง...' : `ส่งคำตอบ (${answeredCount}/${totalQuestions} ข้อ)`}
              </button>
            ) : (
              <button
                onClick={() => setCurrentIdx((i) => Math.min(totalQuestions - 1, i + 1))}
                className="flex-1 h-10 bg-ink text-paper rounded-control font-medium hover:bg-ink/90 transition-colors"
              >
                ข้อถัดไป →
              </button>
            )}
          </div>

          {/* Early submit if all answered */}
          {answeredCount === totalQuestions && !isLastQuestion && (
            <button
              onClick={() => handleSubmit()}
              disabled={submitting}
              className="w-full mt-3 h-10 bg-coral text-white rounded-control font-medium hover:bg-coral-dark transition-colors text-sm disabled:opacity-60"
            >
              ส่งคำตอบทั้งหมด ({answeredCount}/{totalQuestions} ข้อ)
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
