'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import Icon from '@/components/ui/Icon';
import Logo from '@/components/ui/Logo';
import { COURSE_SECTIONS, getCourseBySlug, FEATURED_COURSES } from '@/data/courses';
import { getQuizzesByCourse } from '@/data/quizzes';

const STORAGE_KEY = (courseId: string) => `pannya-progress-${courseId}`;

function loadCompleted(courseId: string): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = localStorage.getItem(STORAGE_KEY(courseId));
    return raw ? new Set(JSON.parse(raw) as string[]) : new Set();
  } catch {
    return new Set();
  }
}

function saveCompleted(courseId: string, ids: Set<string>) {
  try {
    localStorage.setItem(STORAGE_KEY(courseId), JSON.stringify([...ids]));
  } catch { /* ignore */ }
}

export default function PlayerPage() {
  const params = useParams<{ courseId: string; lessonId: string }>();
  const router = useRouter();

  const course = getCourseBySlug(params.courseId) ?? FEATURED_COURSES[0];
  const allLessons = COURSE_SECTIONS.flatMap((s) => s.lessons);
  const quizzes = getQuizzesByCourse(course.id ?? 'c-001');

  const [activeLesson, setActiveLesson] = useState(params.lessonId ?? allLessons[0].id);
  const [isPlaying, setIsPlaying] = useState(false);
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [justMarked, setJustMarked] = useState(false);

  // Load persisted progress on mount
  useEffect(() => {
    setCompleted(loadCompleted(params.courseId));
  }, [params.courseId]);

  const currentLesson = allLessons.find((l) => l.id === activeLesson) ?? allLessons[0];
  const currentIdx = allLessons.findIndex((l) => l.id === activeLesson);
  const nextLesson = allLessons[currentIdx + 1] ?? null;
  const prevLesson = allLessons[currentIdx - 1] ?? null;

  const completedCount = completed.size;
  const progress = allLessons.length > 0 ? Math.round((completedCount / allLessons.length) * 100) : 0;
  const isCurrentCompleted = completed.has(activeLesson);

  // Find which section the current lesson belongs to
  const currentSection = COURSE_SECTIONS.find((s) => s.lessons.some((l) => l.id === activeLesson));
  // Find quiz for the current section
  const sectionQuiz = quizzes.find((q) => q.sectionId === currentSection?.id);
  // True when the active lesson is the last one in its section
  const isLastInSection =
    currentSection?.lessons[currentSection.lessons.length - 1]?.id === activeLesson;

  function markComplete() {
    const next = new Set(completed);
    next.add(activeLesson);
    setCompleted(next);
    saveCompleted(params.courseId, next);
    setJustMarked(true);
    setTimeout(() => setJustMarked(false), 2000);
  }

  function navigateTo(lessonId: string) {
    setActiveLesson(lessonId);
    setIsPlaying(false);
    router.replace(`/learn/${params.courseId}/${lessonId}`, { scroll: false });
  }

  return (
    <div className="h-screen bg-ink flex flex-col overflow-hidden">
      {/* Player TopBar */}
      <header className="flex items-center px-6 py-3 border-b border-white/10 shrink-0">
        <Logo color="#fbf9f3" size={22} />
        <div className="mx-4 h-4 w-px bg-white/20" />
        <div className="flex-1 min-w-0">
          <div className="text-paper text-sm font-medium truncate">{course.title}</div>
          <div className="text-paper/40 text-xs truncate">{currentLesson.title}</div>
        </div>
        <div className="flex items-center gap-3 ml-4 shrink-0">
          <div className="flex items-center gap-2 text-xs text-paper/50">
            <div className="w-24 h-1 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-coral rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
            <span className="font-mono">{progress}%</span>
          </div>
          <Link
            href={`/courses/${course.slug}`}
            className="text-paper/50 hover:text-paper/80 transition-colors"
          >
            <Icon name="x-circle" size={18} color="currentColor" />
          </Link>
        </div>
      </header>

      <div className="flex flex-1 min-h-0">
        {/* Video area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Video placeholder */}
          <div className="bg-black flex-1 flex items-center justify-center relative">
            <div className="text-center">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-16 h-16 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors mb-4"
              >
                <Icon name={isPlaying ? 'pause' : 'play'} size={28} color="#fff" />
              </button>
              <div className="text-white/50 text-sm font-mono">{currentLesson.title}</div>
              <div className="text-white/30 text-xs mt-1">{currentLesson.duration}</div>
            </div>

            {/* Video controls bar */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="h-1 bg-white/20 rounded-full mb-3 cursor-pointer">
                <div className="h-full w-[35%] bg-coral rounded-full relative">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow" />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button onClick={() => setIsPlaying(!isPlaying)}>
                  <Icon name={isPlaying ? 'pause' : 'play'} size={18} color="#fff" />
                </button>
                <span className="text-white/60 text-xs font-mono">5:42 / {currentLesson.duration}</span>
                <div className="flex-1" />
                <button><Icon name="volume" size={16} color="rgba(255,255,255,.6)" /></button>
                <button><Icon name="settings" size={16} color="rgba(255,255,255,.6)" /></button>
                <button><Icon name="maximize" size={16} color="rgba(255,255,255,.6)" /></button>
              </div>
            </div>
          </div>

          {/* Lesson info + actions */}
          <div className="bg-paper border-t border-line px-8 py-5 shrink-0">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h2 className="serif text-xl font-medium text-ink">{currentLesson.title}</h2>
                <div className="flex items-center gap-4 mt-1.5 text-sm text-ink-3">
                  <span className="font-mono">{currentLesson.duration}</span>
                  <span>·</span>
                  <span>{course.instructor}</span>
                  {isCurrentCompleted && (
                    <>
                      <span>·</span>
                      <span className="inline-flex items-center gap-1 text-sage">
                        <Icon name="check-circle" size={13} color="#6a8f6a" />
                        เรียนจบแล้ว
                      </span>
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {/* Mark complete */}
                {!isCurrentCompleted ? (
                  <button
                    onClick={markComplete}
                    className="h-9 px-4 bg-sage text-white rounded-control text-sm font-medium hover:bg-sage/80 transition-colors inline-flex items-center gap-2"
                  >
                    <Icon name="check" size={14} color="#fff" strokeWidth={2.5} />
                    {justMarked ? 'บันทึกแล้ว!' : 'ทำเครื่องหมายว่าจบ'}
                  </button>
                ) : (
                  <div className="h-9 px-4 bg-sage-soft text-sage rounded-control text-sm font-medium inline-flex items-center gap-2 border border-sage/20">
                    <Icon name="check-circle" size={14} color="#6a8f6a" />
                    เรียนจบแล้ว
                  </div>
                )}

                {/* Quiz button — shows when at last lesson of a section that has a quiz */}
                {isLastInSection && sectionQuiz && (
                  <Link
                    href={`/learn/${params.courseId}/quiz/${sectionQuiz.id}`}
                    className="h-9 px-4 bg-gold text-white rounded-control text-sm font-medium hover:bg-gold/80 transition-colors inline-flex items-center gap-2"
                  >
                    <Icon name="book" size={14} color="#fff" />
                    ทำแบบทดสอบ
                  </Link>
                )}
                {/* Next lesson button */}
                {nextLesson && (
                  <button
                    onClick={() => navigateTo(nextLesson.id)}
                    className="h-9 px-4 bg-coral text-white rounded-control text-sm font-medium hover:bg-coral-dark transition-colors inline-flex items-center gap-2"
                  >
                    บทถัดไป
                    <Icon name="arrow-right" size={14} color="#fff" />
                  </button>
                )}
              </div>
            </div>

            {/* Prev/Next nav */}
            <div className="flex items-center gap-3 mt-4 pt-4 border-t border-line">
              {prevLesson ? (
                <button
                  onClick={() => navigateTo(prevLesson.id)}
                  className="text-sm text-ink-3 hover:text-ink transition-colors inline-flex items-center gap-1.5"
                >
                  <Icon name="arrow-right" size={13} color="currentColor" className="rotate-180" />
                  {prevLesson.title}
                </button>
              ) : <div />}
              {nextLesson && (
                <button
                  onClick={() => navigateTo(nextLesson.id)}
                  className="ml-auto text-sm text-ink-3 hover:text-coral transition-colors inline-flex items-center gap-1.5"
                >
                  {nextLesson.title}
                  <Icon name="arrow-right" size={13} color="currentColor" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar curriculum */}
        <aside className="w-72 bg-paper border-l border-line flex flex-col shrink-0 overflow-y-auto">
          <div className="px-4 py-4 border-b border-line">
            <div className="text-sm font-medium text-ink">เนื้อหาหลักสูตร</div>
            <div className="text-xs text-ink-4 mt-0.5">{completedCount}/{allLessons.length} บทเสร็จแล้ว</div>
          </div>

          {COURSE_SECTIONS.map((section) => {
            const secQuiz = quizzes.find((q) => q.sectionId === section.id);
            return (
              <div key={section.id}>
                <div className="px-4 py-3 bg-cream-2 text-xs font-medium text-ink-3 uppercase tracking-wider">
                  {section.title}
                </div>
                {section.lessons.map((lesson) => {
                  const isDone = completed.has(lesson.id);
                  return (
                    <button
                      key={lesson.id}
                      onClick={() => navigateTo(lesson.id)}
                      className={`w-full flex items-start gap-3 px-4 py-3 text-left border-b border-line/50 hover:bg-cream transition-colors ${
                        activeLesson === lesson.id ? 'bg-coral-soft border-l-2 border-l-coral' : ''
                      }`}
                    >
                      <div className="mt-0.5 shrink-0">
                        {isDone ? (
                          <Icon name="check-circle" size={15} color="#6a8f6a" />
                        ) : (
                          <Icon name="play" size={15} color={activeLesson === lesson.id ? '#d4623f' : '#8a92a6'} />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={`text-xs leading-snug ${activeLesson === lesson.id ? 'text-coral font-medium' : 'text-ink-3'}`}>
                          {lesson.title}
                        </div>
                        <div className="text-[11px] text-ink-4 font-mono mt-1">{lesson.duration}</div>
                      </div>
                    </button>
                  );
                })}

                {/* Quiz entry point in sidebar */}
                {secQuiz && (
                  <Link
                    href={`/learn/${params.courseId}/quiz/${secQuiz.id}`}
                    className="w-full flex items-start gap-3 px-4 py-3 text-left border-b border-line/50 hover:bg-cream transition-colors group"
                  >
                    <div className="mt-0.5 shrink-0">
                      <Icon name="book" size={15} color="#c9a14a" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-gold group-hover:text-amber-600 transition-colors leading-snug">
                        {secQuiz.title}
                      </div>
                      <div className="text-[11px] text-ink-4 font-mono mt-1">{secQuiz.questions.length} ข้อ</div>
                    </div>
                  </Link>
                )}
              </div>
            );
          })}
        </aside>
      </div>
    </div>
  );
}
