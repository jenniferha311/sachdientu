import { useState, useEffect, useCallback } from 'react';
import { UserLearningState } from '../types/book';
import { QUIZ_QUESTIONS } from '../data/activities';
import { STORY_FIGURES } from '../data/bookContent';

const STORAGE_KEY = 'co_ay_da_bat_dau_nhu_the_state_v1';

const DEFAULT_STATE: UserLearningState = {
  currentPage: 0,
  readingMode: 'flip',
  fontSize: 18,
  bookmarks: [],
  reflections: {},
  finalReflections: {},
  quizAnswers: {},
  quizSubmitted: false,
  quizScore: 0,
  selectedChallengeId: 'T1',
  challengeJournal: {},
  challengeActionReview: {
    directAction: '',
    persistence: '',
    initiative: '',
  },
  rubricRatings: {},
  rubricTeacherNotes: '',
};

export function useBookStorage() {
  const [state, setState] = useState<UserLearningState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...DEFAULT_STATE, ...parsed };
      }
    } catch (e) {
      console.warn('Could not read from localStorage', e);
    }
    return DEFAULT_STATE;
  });

  const [saveStatusMessage, setSaveStatusMessage] = useState<string>('');

  // Persist to localStorage with safety
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Storage write error (quota exceeded or disabled):', e);
      setSaveStatusMessage('Bộ nhớ trình duyệt đầy hoặc bị hạn chế; dữ liệu chỉ lưu trong phiên này.');
    }
  }, [state]);

  const setPage = useCallback((pageIndex: number) => {
    setState((prev) => ({ ...prev, currentPage: Math.max(0, pageIndex) }));
  }, []);

  const setReadingMode = useCallback((mode: 'flip' | 'continuous') => {
    setState((prev) => ({ ...prev, readingMode: mode }));
  }, []);

  const setFontSize = useCallback((size: number) => {
    setState((prev) => ({ ...prev, fontSize: Math.min(24, Math.max(14, size)) }));
  }, []);

  const toggleBookmark = useCallback((pageIndex: number) => {
    setState((prev) => {
      const exists = prev.bookmarks.includes(pageIndex);
      return {
        ...prev,
        bookmarks: exists
          ? prev.bookmarks.filter((p) => p !== pageIndex)
          : [...prev.bookmarks, pageIndex].sort((a, b) => a - b),
      };
    });
  }, []);

  const saveReflection = useCallback((code: string, answer: string, status: 'saved' | 'later' | 'empty' = 'saved') => {
    setState((prev) => ({
      ...prev,
      reflections: {
        ...prev.reflections,
        [code]: {
          answer,
          savedAt: new Date().toISOString(),
          status,
        },
      },
    }));
  }, []);

  const saveFinalReflection = useCallback((id: string, text: string) => {
    setState((prev) => ({
      ...prev,
      finalReflections: {
        ...prev.finalReflections,
        [id]: text,
      },
    }));
  }, []);

  const selectQuizAnswer = useCallback((questionId: string, answerKey: 'A' | 'B' | 'C' | 'D') => {
    setState((prev) => {
      if (prev.quizSubmitted) return prev; // Do not edit after submission
      return {
        ...prev,
        quizAnswers: {
          ...prev.quizAnswers,
          [questionId]: answerKey,
        },
      };
    });
  }, []);

  const submitQuiz = useCallback(() => {
    setState((prev) => {
      let score = 0;
      QUIZ_QUESTIONS.forEach((q) => {
        if (prev.quizAnswers[q.id] === q.correctKey) {
          score += 1;
        }
      });
      return {
        ...prev,
        quizSubmitted: true,
        quizScore: score,
      };
    });
  }, []);

  const resetQuiz = useCallback(() => {
    setState((prev) => ({
      ...prev,
      quizAnswers: {},
      quizSubmitted: false,
      quizScore: 0,
    }));
  }, []);

  const setSelectedChallenge = useCallback((challengeId: string) => {
    setState((prev) => ({ ...prev, selectedChallengeId: challengeId }));
  }, []);

  const saveJournalField = useCallback((fieldId: string, value: string) => {
    setState((prev) => ({
      ...prev,
      challengeJournal: {
        ...prev.challengeJournal,
        [fieldId]: value,
      },
    }));
  }, []);

  const saveActionReview = useCallback((key: 'directAction' | 'persistence' | 'initiative', value: string) => {
    setState((prev) => ({
      ...prev,
      challengeActionReview: {
        ...prev.challengeActionReview,
        [key]: value,
      },
    }));
  }, []);

  const setRubricRating = useCallback((criteriaId: string, rating: 'Đã thể hiện' | 'Cần làm rõ' | 'Chưa có minh chứng') => {
    setState((prev) => ({
      ...prev,
      rubricRatings: {
        ...prev.rubricRatings,
        [criteriaId]: rating,
      },
    }));
  }, []);

  const setRubricTeacherNotes = useCallback((notes: string) => {
    setState((prev) => ({ ...prev, rubricTeacherNotes: notes }));
  }, []);

  const clearAllData = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn(e);
    }
    setState(DEFAULT_STATE);
  }, []);

  // Export report as markdown
  const exportLearnerMarkdown = useCallback(() => {
    let md = `# PHIẾU HỌC TẬP VÀ SUY NGẪM CÁ NHÂN\n`;
    md += `Sách: CÔ ẤY ĐÃ BẮT ĐẦU NHƯ THẾ - Những câu chuyện nữ giới trong STEM\n`;
    md += `Đơn vị: Câu lạc bộ STEM EMGIS · Tỉnh Phú Thọ\n`;
    md += `Thời gian xuất phiếu: ${new Date().toLocaleString('vi-VN')}\n\n`;
    md += `---\n\n`;

    // 1. Reflections after each story
    md += `## 1. SUY NGẪM SAU TỪNG CÂU CHUYỆN ("Dừng lại một chút")\n\n`;
    STORY_FIGURES.forEach((fig) => {
      const entry = state.reflections[fig.code];
      md += `### [${fig.code}] ${fig.name} - ${fig.storyTitle}\n`;
      md += `*Câu hỏi:* ${fig.reflectionQuestion}\n\n`;
      if (entry && entry.answer && entry.answer.trim()) {
        md += `**Câu trả lời của bạn (${entry.status === 'later' ? 'Ghi chú để sau' : 'Đã hoàn thành'}):**\n${entry.answer.trim()}\n\n`;
      } else {
        md += `*(Chưa nhập câu trả lời)*\n\n`;
      }
    });

    // 2. Final reflections
    md += `---\n\n## 2. NHÌN LẠI CUỐI SÁCH\n\n`;
    const finalPrompts = [
      { id: 'S1', title: 'S1. Một khởi đầu gần với bạn' },
      { id: 'S2', title: 'S2. Điều bạn nghĩ đã thay đổi — hoặc vẫn còn là câu hỏi' },
      { id: 'S3', title: 'S3. Một cánh cửa bạn muốn mở' },
    ];
    finalPrompts.forEach((p) => {
      const text = state.finalReflections[p.id];
      md += `### ${p.title}\n`;
      if (text && text.trim()) {
        md += `${text.trim()}\n\n`;
      } else {
        md += `*(Chưa thực hiện)*\n\n`;
      }
    });

    // 3. Quiz results
    md += `---\n\n## 3. KẾT QUẢ TRẮC NGHIỆM ĐỌC HIỂU ("Thử sức")\n\n`;
    if (state.quizSubmitted) {
      md += `**Điểm số:** ${state.quizScore}/12 câu đúng\n\n`;
      QUIZ_QUESTIONS.forEach((q, idx) => {
        const userChoice = state.quizAnswers[q.id];
        const isCorrect = userChoice === q.correctKey;
        md += `${idx + 1}. [${q.id}] ${q.question}\n`;
        md += `- Lựa chọn của bạn: ${userChoice || 'Chưa trả lời'}\n`;
        md += `- Đáp án chuẩn: ${q.correctKey}\n`;
        md += `- Kết quả: ${isCorrect ? 'ĐÚNG' : 'CHƯA ĐÚNG'}\n`;
        md += `- Giải thích: ${q.explanation}\n\n`;
      });
    } else {
      md += `*(Chưa nộp bài trắc nghiệm)*\n\n`;
    }

    // 4. Practical challenge journal
    md += `---\n\n## 4. NHẬT KÝ THỬ THÁCH THỰC HÀNH ("Bắt đầu")\n\n`;
    md += `**Nhiệm vụ đã chọn:** ${state.selectedChallengeId}\n\n`;
    for (let i = 1; i <= 12; i++) {
      const val = state.challengeJournal[`j${i}`];
      md += `**Câu hỏi j${i}:**\n${val ? val.trim() : '*(Chưa ghi nhận)*'}\n\n`;
    }

    md += `### Bảng tự nhìn lại hành động:\n`;
    md += `- **Trực tiếp thực hiện:** ${state.challengeActionReview.directAction || 'Chưa thực hiện'}\n`;
    md += `- **Duy trì hoạt động (kiên trì/thử lại):** ${state.challengeActionReview.persistence || 'Chưa thực hiện'}\n`;
    md += `- **Chủ động đóng góp:** ${state.challengeActionReview.initiative || 'Chưa thực hiện'}\n\n`;

    // 5. Rubric
    md += `---\n\n## 5. PHIẾU PHẢN HỒI THỰC HIỆN NHIỆM VỤ (Tự kiểm / Nhận xét)\n\n`;
    Object.entries(state.rubricRatings).forEach(([critId, rating]) => {
      md += `- Tiêu chí ${critId}: ${rating}\n`;
    });
    if (state.rubricTeacherNotes) {
      md += `\n**Nhận xét:**\n${state.rubricTeacherNotes}\n`;
    }

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Phieu_Hoc_Tap_Co_Ay_Da_Bat_Dau_Nhu_The_${new Date().toISOString().slice(0, 10)}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [state]);

  return {
    state,
    setPage,
    setReadingMode,
    setFontSize,
    toggleBookmark,
    saveReflection,
    saveFinalReflection,
    selectQuizAnswer,
    submitQuiz,
    resetQuiz,
    setSelectedChallenge,
    saveJournalField,
    saveActionReview,
    setRubricRating,
    setRubricTeacherNotes,
    clearAllData,
    exportLearnerMarkdown,
    saveStatusMessage,
  };
}
