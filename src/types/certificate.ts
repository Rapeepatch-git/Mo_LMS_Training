export interface Certificate {
  id: string;
  courseId: string;
  courseTitle: string;
  instructorName: string;
  studentName: string;
  issuedAt: string;      // ISO date string
  credentialId: string;
}
