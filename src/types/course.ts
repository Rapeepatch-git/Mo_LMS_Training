export type CourseTint = 'navy' | 'coral' | 'sage' | 'gold' | 'plum' | 'cream';
export type CourseLevel = 'พื้นฐาน' | 'ปานกลาง' | 'ขั้นสูง' | 'ทุกระดับ';

export interface Course {
  id: string;
  slug: string;
  title: string;
  instructor: string;
  instructorSlug: string;
  duration: string;         // e.g. "8 ชม. 24 นาที"
  lessons: number;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  level: CourseLevel;
  category: string;
  categorySlug: string;
  badge?: string;           // BESTSELLER | NEW | TOP RATED | BUNDLE
  tint: CourseTint;
  thumb?: string;           // placeholder label
  description?: string;
  tags?: string[];
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  isPreview?: boolean;
  isCompleted?: boolean;
}

export interface CourseSection {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Category {
  icon: string;
  label: string;
  slug: string;
  count: number;
}

export interface CareerPath {
  id: string;
  title: string;
  hours: string;
  courses: string;
  level: string;
  tint: CourseTint;
  color: string;
}
