'use client';

import { useState, useEffect, useCallback } from 'react';

const storageKey = (courseId: string) => `pannya-progress-${courseId}`;

export interface ProgressState {
  completedLessons: Set<string>;
  markComplete: (lessonId: string) => void;
  markIncomplete: (lessonId: string) => void;
  isCompleted: (lessonId: string) => boolean;
  completedCount: number;
  progressPercent: (totalLessons: number) => number;
}

export function useProgress(courseId: string): ProgressState {
  const [completedLessons, setCompleted] = useState<Set<string>>(new Set());

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey(courseId));
      if (raw) setCompleted(new Set(JSON.parse(raw) as string[]));
    } catch { /* ignore */ }
  }, [courseId]);

  const persist = useCallback((next: Set<string>) => {
    try {
      localStorage.setItem(storageKey(courseId), JSON.stringify([...next]));
    } catch { /* ignore */ }
  }, [courseId]);

  const markComplete = useCallback((lessonId: string) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      next.add(lessonId);
      persist(next);
      return next;
    });
  }, [persist]);

  const markIncomplete = useCallback((lessonId: string) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      next.delete(lessonId);
      persist(next);
      return next;
    });
  }, [persist]);

  const isCompleted = useCallback((lessonId: string) => completedLessons.has(lessonId), [completedLessons]);

  const progressPercent = useCallback(
    (totalLessons: number) => (totalLessons > 0 ? Math.round((completedLessons.size / totalLessons) * 100) : 0),
    [completedLessons]
  );

  return {
    completedLessons,
    markComplete,
    markIncomplete,
    isCompleted,
    completedCount: completedLessons.size,
    progressPercent,
  };
}
