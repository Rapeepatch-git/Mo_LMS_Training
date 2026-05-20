import type { Course } from '@/types';
import { ALL_COURSES } from '@/data/courses';

// Module-level singleton — persists across requests in the same server process.
// Resets on hot-reload in dev; replace with Prisma in Phase 4.
declare global {
  // eslint-disable-next-line no-var
  var __courseStore: Map<string, Course> | undefined;
}

function getStore(): Map<string, Course> {
  if (!global.__courseStore) {
    global.__courseStore = new Map(ALL_COURSES.map((c) => [c.id, c]));
  }
  return global.__courseStore;
}

export function getAllCourses(): Course[] {
  return [...getStore().values()];
}

export function getCourseById(id: string): Course | undefined {
  return getStore().get(id);
}

export function createCourse(data: Omit<Course, 'id'>): Course {
  const id = `c-${Date.now()}`;
  const course: Course = { id, ...data };
  getStore().set(id, course);
  return course;
}

export function updateCourse(id: string, data: Partial<Course>): Course | null {
  const existing = getStore().get(id);
  if (!existing) return null;
  const updated = { ...existing, ...data, id };
  getStore().set(id, updated);
  return updated;
}

export function deleteCourse(id: string): boolean {
  return getStore().delete(id);
}
