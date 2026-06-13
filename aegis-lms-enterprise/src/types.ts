/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum UserRole {
  SUPER_ADMIN = "SUPER_ADMIN",
  SCHOOL_ADMIN = "SCHOOL_ADMIN",
  TEACHER = "TEACHER",
  STUDENT = "STUDENT",
  PARENT = "PARENT"
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  points: number;
  level: number;
  badges: Badge[];
  enrolledCourses?: string[]; // Course IDs
  parentOf?: string; // Student ID if parent
  teacherOf?: string[]; // Course IDs if teacher
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  instructorId: string;
  instructorName: string;
  instructorAvatar: string;
  thumbnail: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  rating: number;
  duration: string; // e.g., "12 hours"
  enrollmentsCount: number;
  price: number;
  published: boolean;
  modules: CourseModule[];
}

export interface CourseModule {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: "video" | "document" | "interactive";
  videoUrl?: string;
  documentUrl?: string;
  completed?: boolean;
  bookmarked?: boolean;
}

export interface LiveSession {
  id: string;
  title: string;
  courseId: string;
  courseName: string;
  instructorId: string;
  instructorName: string;
  startTime: string;
  duration: string;
  status: "upcoming" | "live" | "completed";
  meetingLink: string;
  attendeesCount: number;
}

export interface Assignment {
  id: string;
  title: string;
  courseId: string;
  courseName: string;
  dueDate: string;
  points: number;
  instructions: string;
  submissions: Submission[];
}

export interface Submission {
  id: string;
  studentId: string;
  studentName: string;
  studentAvatar: string;
  submittedAt: string;
  content: string;
  status: "pending" | "graded";
  grade?: number;
  feedback?: string;
}

export interface Exam {
  id: string;
  title: string;
  courseId: string;
  courseName: string;
  durationMinutes: number;
  questions: Question[];
  results: ExamResult[];
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctOptionIndex: number;
}

export interface ExamResult {
  id: string;
  studentId: string;
  studentName: string;
  score: number;
  totalQuestions: number;
  completedAt: string;
  passed: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  senderRole: UserRole;
  content: string;
  timestamp: string;
}

export interface DiscussionThread {
  id: string;
  title: string;
  content: string;
  authorName: string;
  authorAvatar: string;
  repliesCount: number;
  category: string;
  createdAt: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  createdBy: string;
  role: string;
  courseId?: string; // Optional course-specific
  createdAt: string;
}

export interface Certificate {
  id: string;
  courseId: string;
  courseName: string;
  studentId: string;
  studentName: string;
  issueDate: string;
  verificationCode: string;
  templateUrl?: string;
}

export interface PaymentInvoice {
  id: string;
  amount: number;
  status: "paid" | "outstanding" | "failed";
  planName: string;
  date: string;
  transactionId: string;
}
