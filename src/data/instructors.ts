export interface Instructor {
  id: string;
  slug: string;
  name: string;
  title: string;
  organization: string;
  bio: string;
  rating: number;
  students: number;
  courses: number;
  tint: string;
}

export const INSTRUCTORS: Instructor[] = [
  {
    id: 'i-001',
    slug: 'nivesh-hemvachiravarakorn',
    name: 'ดร.นิเวศน์ เหมวชิรวรากร',
    title: 'ผู้ก่อตั้ง Thai VI',
    organization: 'Thai Value Investor Club',
    bio: 'นักลงทุนแบบ Value Investing ชั้นแนวหน้าของไทย ผู้ก่อตั้ง Thai VI และผู้เขียนหนังสือการลงทุนที่ขายดีที่สุดหลายเล่ม มีประสบการณ์ลงทุนในตลาดหุ้นไทยมากกว่า 30 ปี',
    rating: 4.9,
    students: 18420,
    courses: 6,
    tint: 'navy',
  },
  {
    id: 'i-002',
    slug: 'pattarapon-anansiri',
    name: 'คุณภัทรพล อนันต์ศิริ',
    title: 'Tech Lead',
    organization: 'Bitkub',
    bio: 'Tech Lead ที่ Bitkub ผู้เชี่ยวชาญด้านการประยุกต์ใช้ AI ในองค์กร ผู้บุกเบิกแนวทาง Human+AI workflow ในบริษัทเทคโนโลยีชั้นนำ',
    rating: 4.8,
    students: 9200,
    courses: 3,
    tint: 'coral',
  },
];
