/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { User, Course, LiveSession, Assignment, Exam, DiscussionThread, Announcement, Certificate, PaymentInvoice, UserRole } from "./types";

// User Directory
export const mockUsers: User[] = [
  {
    id: "user-super-admin",
    name: "Alex Vance",
    email: "alexa.vance@aegis-lms.com",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
    role: UserRole.SUPER_ADMIN,
    points: 1250,
    level: 12,
    badges: [
      { id: "b1", name: "Deployer", description: "Configured system variables.", icon: "ShieldCheck", unlockedAt: "2026-04-12" }
    ]
  },
  {
    id: "user-school-admin",
    name: "Sarah Jenkins",
    email: "s.jenkins@academy.edu",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150",
    role: UserRole.SCHOOL_ADMIN,
    points: 850,
    level: 8,
    badges: [
      { id: "b2", name: "Architect", description: "Designed the academy structure.", icon: "Award", unlockedAt: "2026-05-10" }
    ]
  },
  {
    id: "user-teacher-1",
    name: "Dr. Marcus Thorne",
    email: "m.thorne@academy.edu",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150",
    role: UserRole.TEACHER,
    points: 3400,
    level: 25,
    badges: [
      { id: "b3", name: "Star Instructor", description: "Maintained 4.9+ rating from 100+ students", icon: "Flame", unlockedAt: "2026-03-15" },
      { id: "b4", name: "Webinar Master", description: "Hosted 20+ live streaming sessions successfully", icon: "Video", unlockedAt: "2026-05-01" }
    ],
    teacherOf: ["course-web-dev", "course-ai-ml"]
  },
  {
    id: "user-teacher-2",
    name: "Elena Rostova",
    email: "e.rostova@academy.edu",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150",
    role: UserRole.TEACHER,
    points: 2100,
    level: 15,
    badges: [
      { id: "b5", name: "Curriculum Wiz", description: "Created 5 structural syllabi", icon: "BookOpen", unlockedAt: "2026-02-18" }
    ],
    teacherOf: ["course-data-science"]
  },
  {
    id: "user-student-1",
    name: "Julian Sterling",
    email: "rionxee@gmail.com", // Keeping realistic email in user object
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150",
    role: UserRole.STUDENT,
    points: 2450,
    level: 18,
    badges: [
      { id: "b6", name: "Fast Tracker", description: "Completed 3 lessons in a single afternoon", icon: "Zap", unlockedAt: "2026-06-01" },
      { id: "b7", name: "Quiz Conqueror", description: "Scored 100% on the Machine Learning finals", icon: "Trophy", unlockedAt: "2026-06-10" },
      { id: "b8", name: "Knowledge Seeker", description: "Unlocked 5 distinct courses on the marketplace", icon: "Sparkles", unlockedAt: "2026-05-20" }
    ],
    enrolledCourses: ["course-web-dev", "course-ai-ml", "course-data-science"]
  },
  {
    id: "user-parent-1",
    name: "Robert Sterling",
    email: "r.sterling@parent.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
    role: UserRole.PARENT,
    points: 150,
    level: 2,
    badges: [
      { id: "b9", name: "Observer", description: "Linked direct progress for student Julian", icon: "Eye", unlockedAt: "2026-05-25" }
    ],
    parentOf: "user-student-1"
  }
];

// Leaderboard Students
export const mockLeaderboard = [
  { rank: 1, name: "Julian Sterling", level: 18, points: 2450, avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=80" },
  { rank: 2, name: "Maya Lin", level: 16, points: 2180, avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80" },
  { rank: 3, name: "Suresh Patel", level: 15, points: 1950, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80" },
  { rank: 4, name: "Aria Thorne", level: 13, points: 1820, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80" },
  { rank: 5, name: "Derek Meyer", level: 12, points: 1540, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80" }
];

// Course Catalog & Content Library
export const mockCourses: Course[] = [
  {
    id: "course-web-dev",
    title: "Enterprise Full-Stack Architecture",
    description: "Master modern multi-tenant layouts, Node.js container orchestration, and state structures at commercial scale.",
    category: "Software Engineering",
    instructorId: "user-teacher-1",
    instructorName: "Dr. Marcus Thorne",
    instructorAvatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150",
    thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600",
    level: "Advanced",
    rating: 4.9,
    duration: "24 hours",
    enrollmentsCount: 1240,
    price: 349,
    published: true,
    modules: [
      {
        id: "m-web-1",
        title: "Module 1: Server Side Architectures & Multi-Tenant Design",
        lessons: [
          { id: "l-web-1-1", title: "Introduction to Single-Process Boundaries", duration: "18:24", type: "video", completed: true },
          { id: "l-web-1-2", title: "Enterprise Database Partitioning Schemas", duration: "25:40", type: "document", completed: true, bookmarked: true },
          { id: "l-web-1-3", title: "API Gateways, Load Balancing & Ingress Rules", duration: "12:15", type: "interactive" }
        ]
      },
      {
        id: "m-web-2",
        title: "Module 2: Custom Reactive State Management & Component Modularization",
        lessons: [
          { id: "l-web-2-1", title: "Zustand & Context Integration Mechanics", duration: "32:10", type: "video", completed: false },
          { id: "l-web-2-2", title: "Handling Heavy Re-rendering Triggers Safely", duration: "15:45", type: "document", completed: false }
        ]
      }
    ]
  },
  {
    id: "course-ai-ml",
    title: "Applied Generative AI & Large Language Models",
    description: "A developer guide to orchestrating SDK layers, function-calling triggers, system instruction pipelines, and vector databases.",
    category: "Artificial Intelligence",
    instructorId: "user-teacher-1",
    instructorName: "Dr. Marcus Thorne",
    instructorAvatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150",
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=600",
    level: "Advanced",
    rating: 4.85,
    duration: "18 hours",
    enrollmentsCount: 940,
    price: 499,
    published: true,
    modules: [
      {
        id: "m-ai-1",
        title: "Module 1: Embedding Spaces & Vector Retrieval Models",
        lessons: [
          { id: "l-ai-1-1", title: "The Geometry of Latent Semantic Representations", duration: "22:15", type: "video", completed: true },
          { id: "l-ai-1-2", title: "Writing Scalable Vector Indexes", duration: "19:50", type: "document", completed: false }
        ]
      }
    ]
  },
  {
    id: "course-data-science",
    title: "Data Visualization & Predictive Insights",
    description: "Learn how to formulate deep-learning regressions, construct custom analytics charts, and deliver reports to management.",
    category: "Data Science",
    instructorId: "user-teacher-2",
    instructorName: "Elena Rostova",
    instructorAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600",
    level: "Intermediate",
    rating: 4.7,
    duration: "14 hours",
    enrollmentsCount: 560,
    price: 199,
    published: false,
    modules: [
      {
        id: "m-ds-1",
        title: "Module 1: Custom Chart Assemblies with SVG Elements",
        lessons: [
          { id: "l-ds-1-1", title: "D3 Data Binding & Scale Formulations", duration: "35:00", type: "video" }
        ]
      }
    ]
  }
];

// Virtual Classes & Live Schedule
export const mockLiveSessions: LiveSession[] = [
  {
    id: "live-session-1",
    title: "Enterprise Multi-Tenancy Architecture Review",
    courseId: "course-web-dev",
    courseName: "Enterprise Full-Stack Architecture",
    instructorId: "user-teacher-1",
    instructorName: "Dr. Marcus Thorne",
    startTime: "2026-06-13T10:00:00-07:00",
    duration: "60 mins",
    status: "live",
    meetingLink: "https://ais-pre-snkq7ri7i6gvr6ha7jjhqn.academy.edu/classroom/live-session-1",
    attendeesCount: 24
  },
  {
    id: "live-session-2",
    title: "Embedding Spaces & Retrieval-Augmented Generation (RAG)",
    courseId: "course-ai-ml",
    courseName: "Applied Generative AI & Large Language Models",
    instructorId: "user-teacher-1",
    instructorName: "Dr. Marcus Thorne",
    startTime: "2026-06-15T14:30:00-07:00",
    duration: "90 mins",
    status: "upcoming",
    meetingLink: "https://ais-pre-snkq7ri7i6gvr6ha7jjhqn.academy.edu/classroom/live-session-2",
    attendeesCount: 0
  },
  {
    id: "live-session-3",
    title: "Q&A Office Hours: Regression Validation Strategies",
    courseId: "course-data-science",
    courseName: "Data Visualization & Predictive Insights",
    instructorId: "user-teacher-2",
    instructorName: "Elena Rostova",
    startTime: "2026-06-18T16:00:00-07:00",
    duration: "45 mins",
    status: "upcoming",
    meetingLink: "https://ais-pre-snkq7ri7i6gvr6ha7jjhqn.academy.edu/classroom/live-session-3",
    attendeesCount: 0
  }
];

// Assignment Center
export const mockAssignments: Assignment[] = [
  {
    id: "assign-1",
    title: "Task 1: Scalable Multi-Tenant Database Design",
    courseId: "course-web-dev",
    courseName: "Enterprise Full-Stack Architecture",
    dueDate: "2026-06-14",
    points: 100,
    instructions: "Draft a schema supporting row-level isolation for separate corporations. Outline secondary index optimizations.",
    submissions: [
      {
        id: "sub-1-1",
        studentId: "user-student-1",
        studentName: "Julian Sterling",
        studentAvatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150",
        submittedAt: "2026-06-11",
        content: "Drafted partition logic using metadata tenant hashes inside standard indexes. Implemented automated rule enforcement cascades.",
        status: "graded",
        grade: 98,
        feedback: "Outstanding separation boundary mechanics! Beautiful index configurations."
      }
    ]
  },
  {
    id: "assign-2",
    title: "Task 2: RAG Pipeline Integration & Semantic Search",
    courseId: "course-ai-ml",
    courseName: "Applied Generative AI & Large Language Models",
    dueDate: "2026-06-19",
    points: 100,
    instructions: "Write a complete query parsing system embedding questions using a cosine distance filter matrix.",
    submissions: []
  }
];

// Examination Center
export const mockExams: Exam[] = [
  {
    id: "exam-ai-1",
    title: "Midterm: Deep Neural Alignments & Semantic Vectors",
    courseId: "course-ai-ml",
    courseName: "Applied Generative AI & Large Language Models",
    durationMinutes: 45,
    questions: [
      {
        id: "q-ai-1",
        text: "Which vector parsing distance formula represents direct angular alignment independent of scalar lengths?",
        options: ["Cosine Similarity", "Euclidean Distance", "Manhattan Vector Alignment", "Minhash Index Calculation"],
        correctOptionIndex: 0
      },
      {
        id: "q-ai-2",
        text: "What does temperature control in LLM token scoring algorithms?",
        options: ["Token sampling probability distribution flatness", "Hardware thermal throttles", "Max output sequence constraints", "The context length memory buffer size"],
        correctOptionIndex: 0
      },
      {
        id: "q-ai-3",
        text: "What is function calling explicitly used for in generator loops?",
        options: ["To retrieve structured tool invoke parameters", "To secure server side secrets", "To pre-compile JavaScript code", "To accelerate graphics unit execution"],
        correctOptionIndex: 0
      }
    ],
    results: [
      {
        id: "res-1",
        studentId: "user-student-1",
        studentName: "Julian Sterling",
        score: 3,
        totalQuestions: 3,
        completedAt: "2026-06-10",
        passed: true
      }
    ]
  }
];

// Support System Discussion Threads & Live Forum
export const mockDiscussions: DiscussionThread[] = [
  {
    id: "disc-1",
    title: "How to prevent memory leakage in React Context loops?",
    content: "When state changes rapidly inside structural components, children re-render. Should we split state providers or memoize?",
    authorName: "Julian Sterling",
    authorAvatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150",
    repliesCount: 3,
    category: "Software Engineering",
    createdAt: "2026-06-11"
  },
  {
    id: "disc-2",
    title: "What represents the best practice for system instruction bounds?",
    content: "Sometimes prompts drift outside instructions during long chats. Is context slicing or persistent system injection preferred?",
    authorName: "Sarah Jenkins",
    authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150",
    repliesCount: 1,
    category: "Artificial Intelligence",
    createdAt: "2026-06-12"
  }
];

// System and Course Announcements
export const mockAnnouncements: Announcement[] = [
  {
    id: "ann-1",
    title: "Academic Platform Migration Complete!",
    content: "Aegis Enterprise Core has launched. The platform now supports multi-role workspace profiles, certification designs, and real-time LLM interaction modules.",
    createdBy: "Sarah Jenkins",
    role: "School Admin",
    createdAt: "2026-06-10"
  },
  {
    id: "ann-2",
    title: "Live session: System-Level Scalability Q&A",
    content: "Join Dr. Marcus Thorne today as we parse real server architectures, benchmark container clusters, and isolate memory thresholds.",
    createdBy: "Dr. Marcus Thorne",
    role: "Teacher",
    courseId: "course-web-dev",
    createdAt: "2026-06-13"
  }
];

// Digital Certificates Directory
export const mockCertificates: Certificate[] = [
  {
    id: "cert-1",
    courseId: "course-web-dev",
    courseName: "Enterprise Full-Stack Architecture",
    studentId: "user-student-1",
    studentName: "Julian Sterling",
    issueDate: "2026-06-10",
    verificationCode: "AEGIS-WBA-99427-010"
  }
];

// Billing & Subscription Invoice Records
export const mockInvoices: PaymentInvoice[] = [
  {
    id: "inv-2104",
    amount: 349,
    status: "paid",
    planName: "Individual Learner Pro",
    date: "2026-06-01",
    transactionId: "TXN_AEGIS_0984180A"
  },
  {
    id: "inv-2091",
    amount: 199,
    status: "paid",
    planName: "Specialist Seminar Access",
    date: "2026-05-12",
    transactionId: "TXN_AEGIS_0512803B"
  }
];

// Subscription Plans Catalogue
export const mockPlans = [
  {
    name: "Standard Academic",
    price: 99,
    period: "month",
    features: ["Access to 10 Basic Courses", "Direct discussion boards", "Digital certification templates", "Weekly webinar schedules"]
  },
  {
    name: "Enterprise Specialized Pro",
    price: 299,
    period: "month",
    features: ["Access to all Catalogues", "AI Study Assistant (unlimited queries)", "Dynamic Custom Portfolios", "1-on-1 Grading Reviews", "Priority Scheduling System"]
  },
  {
    name: "Institutional Global",
    price: 1499,
    period: "year",
    features: ["White-labelled Academy Controls", "Super-admin core audit logs", "Custom classroom integrations", "Automated system deployment APIs", "VDI Server instances"]
  }
];

// Personalized Study Pathway Tree Structure
export const mockLearningPath = [
  {
    id: "p-node-1",
    title: "Core Mechanics",
    description: "Component Lifecycles & Static Scoping rules",
    status: "completed"
  },
  {
    id: "p-node-2",
    title: "Advanced Partitioning",
    description: "Separating tenant boundaries cleanly across indexes",
    status: "active"
  },
  {
    id: "p-node-4",
    title: "Applied Generative Logic",
    description: "Function-calling loops & RAG retrieval optimization",
    status: "locked"
  },
  {
    id: "p-node-5",
    title: "Commercial Distribution",
    description: "Packaging systems & CI-CD validation routines",
    status: "locked"
  }
];
