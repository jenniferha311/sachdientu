export interface StoryFigure {
  id: string;
  code: string; // R01 to R23
  number: number; // 1 to 23
  name: string;
  nativeName?: string;
  role: string;
  organizationOrContext: string;
  storyTitle: string;
  partId: number;
  partName: string;
  portraitNote: string;
  summaryQuote: string;
  paragraphs: string[];
  reflectionQuestion: string;
}

export interface BookPart {
  id: number;
  roman: string;
  title: string;
  subtitle: string;
  leadQuote: string;
  description: string;
  figureIds: string[];
}

export interface QuizQuestion {
  id: string; // Q01 to Q12
  figureName: string;
  figureId: string;
  question: string;
  options: {
    key: 'A' | 'B' | 'C' | 'D';
    text: string;
  }[];
  correctKey: 'A' | 'B' | 'C' | 'D';
  explanation: string;
}

export interface FinalReflectionPrompt {
  id: string; // S1, S2, S3
  title: string;
  prompt: string;
  wordCountRecommendation: string;
  selfChecklist: string[];
}

export interface PracticalChallenge {
  id: string; // T1, T2, T3
  title: string;
  openIdea: string;
  mission: string;
  easyTip: string;
  steps: string[];
  deliverable: string;
}

export interface UserLearningState {
  currentPage: number;
  readingMode: 'flip' | 'continuous';
  fontSize: number; // 16, 18, 20, 22
  bookmarks: number[];
  reflections: Record<string, { answer: string; savedAt?: string; status: 'saved' | 'later' | 'empty' }>;
  finalReflections: Record<string, string>;
  quizAnswers: Record<string, 'A' | 'B' | 'C' | 'D'>;
  quizSubmitted: boolean;
  quizScore: number;
  selectedChallengeId: string;
  challengeJournal: Record<string, string>;
  challengeActionReview: {
    directAction: string;
    persistence: string;
    initiative: string;
  };
  rubricRatings: Record<string, 'Đã thể hiện' | 'Cần làm rõ' | 'Chưa có minh chứng'>;
  rubricTeacherNotes: string;
}
