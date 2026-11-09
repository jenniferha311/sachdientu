import React, { useState } from 'react';
import { 
  Sparkles, 
  HelpCircle, 
  Target, 
  CheckCircle, 
  AlertCircle, 
  Download, 
  Printer, 
  Trash2, 
  RotateCcw, 
  ArrowRight,
  BookOpen,
  ClipboardList,
  Check
} from 'lucide-react';
import { 
  FINAL_REFLECTIONS, 
  QUIZ_QUESTIONS, 
  PRACTICAL_CHALLENGES, 
  JOURNAL_QUESTIONS, 
  TEACHER_RUBRIC_CRITERIA 
} from '../data/activities';
import { UserLearningState } from '../types/book';

interface InteractiveActivitiesPageProps {
  state: UserLearningState;
  pageNumber: number;
  onSaveFinalReflection: (id: string, text: string) => void;
  onSelectQuizAnswer: (qId: string, optKey: 'A' | 'B' | 'C' | 'D') => void;
  onSubmitQuiz: () => void;
  onResetQuiz: () => void;
  onSelectChallenge: (id: string) => void;
  onSaveJournalField: (fieldId: string, val: string) => void;
  onSaveActionReview: (key: 'directAction' | 'persistence' | 'initiative', val: string) => void;
  onSetRubricRating: (critId: string, rating: 'Đã thể hiện' | 'Cần làm rõ' | 'Chưa có minh chứng') => void;
  onSetRubricTeacherNotes: (notes: string) => void;
  onExportMarkdown: () => void;
  onOpenPrint: () => void;
  onClearAll: () => void;
  onNavigateToFigure: (figureId: string) => void;
}

export const InteractiveActivitiesPage: React.FC<InteractiveActivitiesPageProps> = ({
  state,
  pageNumber,
  onSaveFinalReflection,
  onSelectQuizAnswer,
  onSubmitQuiz,
  onResetQuiz,
  onSelectChallenge,
  onSaveJournalField,
  onSaveActionReview,
  onSetRubricRating,
  onSetRubricTeacherNotes,
  onExportMarkdown,
  onOpenPrint,
  onClearAll,
  onNavigateToFigure,
}) => {
  const [activeTab, setActiveTab] = useState<'review' | 'quiz' | 'challenge' | 'rubric'>('review');
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Quiz calculations
  const answeredCount = Object.keys(state.quizAnswers).length;
  const unansweredCount = QUIZ_QUESTIONS.length - answeredCount;

  return (
    <div className="w-full h-full min-h-[600px] p-6 sm:p-10 md:p-12 bg-[#F7F3EA] text-[#203746] flex flex-col justify-between overflow-y-auto">
      <div>
        {/* Top Header */}
        <div className="border-b border-[#E5DECE] pb-4 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-xs font-sans-ui text-[#B66A50] font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-[#B66A50]" />
                <span>PHẦN TƯƠNG TÁC CUỐI SÁCH</span>
              </div>
              <h2 className="font-serif-book font-bold text-2xl sm:text-3xl text-[#203746] mt-1">
                Đến lượt em bắt đầu
              </h2>
              <p className="font-serif-book italic text-xs sm:text-sm text-[#203746]/70 mt-1">
                Suy ngẫm cá nhân, trắc nghiệm đọc hiểu và thử thách thực hành tự chọn.
              </p>
            </div>

            {/* Quick Export & Actions Toolbar */}
            <div className="flex items-center gap-2 font-sans-ui text-xs">
              <button
                onClick={onExportMarkdown}
                className="px-3 py-1.5 rounded-md bg-[#397D78] hover:bg-[#2C625E] text-white font-medium shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Tải tệp Markdown toàn bộ câu trả lời của em"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Tải phiếu của em (.md)</span>
              </button>

              <button
                onClick={onOpenPrint}
                className="px-3 py-1.5 rounded-md bg-[#EAE3D2] hover:bg-[#D9D0BE] text-[#203746] font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
                title="In phiếu học tập ra giấy"
              >
                <Printer className="w-3.5 h-3.5 text-[#397D78]" />
                <span>In phiếu</span>
              </button>

              <button
                onClick={() => setShowClearConfirm(true)}
                className="p-1.5 rounded-md border border-[#D9D0BE] text-[#203746]/60 hover:text-[#B66A50] hover:bg-[#EAE3D2] transition-colors cursor-pointer"
                title="Xóa dữ liệu cá nhân trên trình duyệt này"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Local Storage Privacy Reminder */}
          <div className="mt-3 p-2 bg-[#F0EBE0] rounded-md text-[11px] font-sans-ui text-[#203746]/70 flex items-center gap-2">
            <AlertCircle className="w-3.5 h-3.5 text-[#397D78] shrink-0" />
            <span>
              Bài của em được lưu trên trình duyệt này; hãy tải bản sao nếu dùng thiết bị dùng chung. Dữ liệu hoàn toàn bảo mật và không gửi lên máy chủ.
            </span>
          </div>

          {/* Interactive Navigation Tabs */}
          <div className="flex border-b border-[#D9D0BE] mt-4 text-xs sm:text-sm font-sans-ui overflow-x-auto scrollbar-none">
            <button
              onClick={() => setActiveTab('review')}
              className={`pb-2.5 px-4 font-semibold border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'review'
                  ? 'border-[#B66A50] text-[#B66A50]'
                  : 'border-transparent text-[#203746]/70 hover:text-[#203746]'
              }`}
            >
              1. Nhìn lại (Suy ngẫm)
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`pb-2.5 px-4 font-semibold border-b-2 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'quiz'
                  ? 'border-[#397D78] text-[#397D78]'
                  : 'border-transparent text-[#203746]/70 hover:text-[#203746]'
              }`}
            >
              <span>2. Thử sức (12 câu trắc nghiệm)</span>
              {state.quizSubmitted && (
                <span className="font-mono text-xs px-1.5 py-0.2 bg-emerald-100 text-emerald-800 rounded">
                  {state.quizScore}/12
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('challenge')}
              className={`pb-2.5 px-4 font-semibold border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'challenge'
                  ? 'border-[#397D78] text-[#397D78]'
                  : 'border-transparent text-[#203746]/70 hover:text-[#203746]'
              }`}
            >
              3. Bắt đầu (Thử thách & Nhật ký)
            </button>
            <button
              onClick={() => setActiveTab('rubric')}
              className={`pb-2.5 px-4 font-semibold border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'rubric'
                  ? 'border-[#397D78] text-[#397D78]'
                  : 'border-transparent text-[#203746]/70 hover:text-[#203746]'
              }`}
            >
              4. Phiếu phản hồi (Tự kiểm / Giáo viên)
            </button>
          </div>
        </div>

        {/* TAB 1: NHÌN LẠI (S1, S2, S3) */}
        {activeTab === 'review' && (
          <div className="space-y-6 animate-fade-in">
            <div className="p-4 bg-[#FAF7F0] rounded-xl border border-[#D9D0BE] space-y-1">
              <p className="font-serif-book font-bold text-sm text-[#203746]">
                Lời mời suy ngẫm sau khi đọc xong:
              </p>
              <p className="font-serif-book italic text-xs sm:text-sm text-[#203746]/80 leading-relaxed">
                Chọn một câu hỏi em muốn trả lời. Một chi tiết cụ thể từ sách và một việc em có thể làm sẽ giúp suy ngẫm của em rõ hơn. Em có thể viết khoảng 80–120 từ hoặc trả lời theo gạch đầu dòng.
              </p>
            </div>

            <div className="space-y-6">
              {FINAL_REFLECTIONS.map((prompt) => {
                const val = state.finalReflections[prompt.id] || '';
                return (
                  <div key={prompt.id} className="p-5 bg-white rounded-xl border border-[#E5DECE] shadow-xs space-y-3">
                    <div className="flex items-baseline justify-between border-b border-[#E5DECE] pb-2">
                      <h3 className="font-serif-book font-bold text-base text-[#B66A50]">
                        {prompt.id}. {prompt.title}
                      </h3>
                      <span className="text-[11px] font-sans-ui text-[#203746]/50">
                        {prompt.wordCountRecommendation}
                      </span>
                    </div>

                    <p className="font-serif-book text-xs sm:text-sm text-[#203746]/90 leading-relaxed">
                      {prompt.prompt}
                    </p>

                    {/* Self-checklist */}
                    <div className="p-3 bg-[#FAF7F0] rounded-lg text-xs font-sans-ui space-y-1 text-[#203746]/80 border border-[#E5DECE]">
                      <p className="font-semibold text-[#397D78]">Phản hồi tự kiểm tra (không quy đổi thành điểm):</p>
                      <ul className="list-disc pl-5 space-y-0.5 text-[11px]">
                        {prompt.selfChecklist.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    <textarea
                      rows={4}
                      value={val}
                      onChange={(e) => onSaveFinalReflection(prompt.id, e.target.value)}
                      onKeyDown={(e) => e.stopPropagation()}
                      placeholder="Viết suy ngẫm của em tại đây..."
                      className="w-full p-3 bg-[#FAF7F0] rounded-lg border border-[#D9D0BE] text-xs sm:text-sm font-serif-book text-[#203746] focus:outline-none focus:border-[#397D78] leading-relaxed resize-y"
                    />

                    <div className="flex justify-between items-center text-xs font-sans-ui text-[#203746]/60">
                      <span>{val.trim() ? `Đã nhập ${val.trim().split(/\s+/).length} từ` : 'Chưa có nội dung'}</span>
                      {val.trim() && (
                        <span className="text-emerald-700 flex items-center gap-1 font-medium text-[11px]">
                          <Check className="w-3.5 h-3.5" /> Đã lưu cục bộ
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: THỬ SỨC (12 CÂU TRẮC NGHIỆM Q01 - Q12) */}
        {activeTab === 'quiz' && (
          <div className="space-y-6 animate-fade-in">
            <div className="p-4 bg-[#FAF7F0] rounded-xl border border-[#D9D0BE] space-y-1">
              <p className="font-serif-book font-bold text-sm text-[#203746]">
                Lời mở đầu trắc nghiệm:
              </p>
              <p className="font-serif-book italic text-xs sm:text-sm text-[#203746]/80 leading-relaxed">
                Các câu hỏi giúp em nhìn lại những điều đã đọc. Em có thể quay về câu chuyện để tìm bằng chứng. Kết quả không dùng để kết luận em có phù hợp với STEM hay không.
              </p>
            </div>

            {/* Quiz Banner & Submission status */}
            {state.quizSubmitted ? (
              <div className="p-5 bg-emerald-50 rounded-xl border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-serif-book font-bold text-lg text-emerald-900">
                    Kết quả đọc hiểu của em: {state.quizScore}/12 câu đúng
                  </h3>
                  <p className="font-serif-book text-xs sm:text-sm text-emerald-800 mt-1">
                    Em trả lời đúng {state.quizScore}/12 câu. Hãy xem lại những câu chuyện em muốn hiểu thêm bên dưới.
                  </p>
                </div>
                <button
                  onClick={() => setShowResetConfirm(true)}
                  className="px-4 py-2 bg-white hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-lg text-xs font-sans-ui font-medium flex items-center gap-1.5 cursor-pointer shrink-0 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Làm lại trắc nghiệm</span>
                </button>
              </div>
            ) : (
              <div className="p-4 bg-[#F0EBE0] rounded-xl border border-[#D9D0BE] flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-sans-ui text-xs">
                <div>
                  <span className="font-semibold text-[#203746]">Tiến độ trả lời: </span>
                  <span className="font-mono text-[#397D78] font-bold">{answeredCount}/12 câu</span>
                  {unansweredCount > 0 && (
                    <span className="text-[#B66A50] ml-2">
                      (Còn {unansweredCount} câu chưa chọn)
                    </span>
                  )}
                </div>
                <button
                  onClick={onSubmitQuiz}
                  className="px-5 py-2 bg-[#397D78] hover:bg-[#2C625E] text-white font-medium rounded-lg shadow-xs cursor-pointer transition-colors"
                >
                  Nộp bài để kiểm tra kết quả
                </button>
              </div>
            )}

            {/* Quiz questions list */}
            <div className="space-y-6">
              {QUIZ_QUESTIONS.map((q, idx) => {
                const userChoice = state.quizAnswers[q.id];
                const isCorrect = userChoice === q.correctKey;

                return (
                  <div 
                    key={q.id}
                    className={`p-5 rounded-xl border transition-all ${
                      state.quizSubmitted
                        ? isCorrect
                          ? 'bg-emerald-50/50 border-emerald-200'
                          : 'bg-rose-50/40 border-rose-200'
                        : 'bg-white border-[#E5DECE] shadow-xs'
                    }`}
                  >
                    {/* Question Header */}
                    <div className="flex items-baseline justify-between gap-2 border-b border-[#E5DECE] pb-2 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-[#397D78]/15 text-[#397D78] font-mono text-xs font-bold">
                          {q.id}
                        </span>
                        <h4 className="font-serif-book font-bold text-sm sm:text-base text-[#203746]">
                          Câu {idx + 1}: {q.figureName}
                        </h4>
                      </div>

                      {state.quizSubmitted && (
                        <span className={`text-xs font-sans-ui font-bold px-2 py-0.5 rounded ${
                          isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                        }`}>
                          {isCorrect ? 'Đúng' : 'Chưa đúng'}
                        </span>
                      )}
                    </div>

                    <p className="font-serif-book text-xs sm:text-sm text-[#203746] font-medium leading-relaxed mb-4">
                      {q.question}
                    </p>

                    {/* Options A - D */}
                    <div className="space-y-2 font-sans-ui text-xs sm:text-sm">
                      {q.options.map((opt) => {
                        const isSelected = userChoice === opt.key;
                        const isAnswerKey = q.correctKey === opt.key;

                        let optionStyle = 'border-[#E5DECE] bg-[#FAF7F0] hover:bg-[#F0EBE0] text-[#203746]';
                        if (isSelected && !state.quizSubmitted) {
                          optionStyle = 'border-[#397D78] bg-[#397D78]/10 text-[#397D78] font-semibold ring-1 ring-[#397D78]';
                        }
                        if (state.quizSubmitted) {
                          if (isAnswerKey) {
                            optionStyle = 'border-emerald-500 bg-emerald-100/70 text-emerald-950 font-semibold ring-1 ring-emerald-500';
                          } else if (isSelected && !isAnswerKey) {
                            optionStyle = 'border-rose-400 bg-rose-100/60 text-rose-950 line-through';
                          } else {
                            optionStyle = 'border-[#E5DECE] bg-white opacity-60 text-[#203746]';
                          }
                        }

                        return (
                          <button
                            key={opt.key}
                            type="button"
                            disabled={state.quizSubmitted}
                            onClick={() => onSelectQuizAnswer(q.id, opt.key)}
                            className={`w-full p-3 rounded-lg border text-left transition-all flex items-start gap-3 cursor-pointer ${optionStyle} ${
                              state.quizSubmitted ? 'cursor-default' : ''
                            }`}
                          >
                            <span className="w-5 h-5 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 border border-current">
                              {opt.key}
                            </span>
                            <span className="flex-1 leading-relaxed">{opt.text}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Explanation after submission */}
                    {state.quizSubmitted && (
                      <div className="mt-4 pt-3 border-t border-[#E5DECE] space-y-2 text-xs font-sans-ui">
                        <div className="p-3 bg-white/80 rounded-lg border border-[#D9D0BE] text-[#203746]/90 space-y-1">
                          <p className="font-semibold text-[#397D78]">
                            Đáp án đúng: {q.correctKey} · Giải thích phản hồi:
                          </p>
                          <p className="font-serif-book leading-relaxed">{q.explanation}</p>
                        </div>

                        <div className="flex justify-end">
                          <button
                            type="button"
                            onClick={() => onNavigateToFigure(q.figureId)}
                            className="text-[#397D78] hover:underline font-semibold flex items-center gap-1 cursor-pointer pt-1"
                          >
                            <BookOpen className="w-3.5 h-3.5" />
                            <span>Trở lại câu chuyện {q.figureName} để xem lại bằng chứng</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Submit button if not submitted */}
            {!state.quizSubmitted && (
              <div className="p-4 bg-[#F0EBE0] rounded-xl border border-[#D9D0BE] flex justify-between items-center font-sans-ui">
                <span className="text-xs text-[#203746]/70">
                  {unansweredCount > 0 
                    ? `Em còn ${unansweredCount} câu chưa trả lời. Các câu bỏ trống sẽ được tính 0 điểm.`
                    : 'Em đã trả lời đủ 12 câu.'}
                </span>
                <button
                  onClick={onSubmitQuiz}
                  className="px-6 py-2.5 bg-[#397D78] hover:bg-[#2C625E] text-white font-medium rounded-lg shadow-sm cursor-pointer transition-colors text-xs sm:text-sm"
                >
                  Nộp bài và xem đáp án
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: BẮT ĐẦU (THỬ THÁCH T1, T2, T3 & NHẬT KÝ 12 CÂU) */}
        {activeTab === 'challenge' && (
          <div className="space-y-6 animate-fade-in">
            <div className="p-4 bg-[#FAF7F0] rounded-xl border border-[#D9D0BE] space-y-1">
              <p className="font-serif-book font-bold text-sm text-[#203746]">
                Lời mời bắt đầu thử thách thực hành:
              </p>
              <p className="font-serif-book italic text-xs sm:text-sm text-[#203746]/80 leading-relaxed">
                Em không cần bắt đầu bằng một phát minh lớn. Hãy chọn một câu hỏi gần mình, trực tiếp làm một việc và ghi lại điều đã xảy ra. Có thể làm một mình hoặc theo nhóm 2–4 bạn.
              </p>
            </div>

            {/* Challenge Selection 3 Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans-ui">
              {PRACTICAL_CHALLENGES.map((ch) => {
                const isSelected = state.selectedChallengeId === ch.id;
                return (
                  <button
                    key={ch.id}
                    onClick={() => onSelectChallenge(ch.id)}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#397D78] bg-[#397D78]/10 ring-2 ring-[#397D78] shadow-xs'
                        : 'border-[#E5DECE] bg-white hover:border-[#397D78]'
                    }`}
                  >
                    <div>
                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#FAF7F0] text-[#B66A50] border border-[#E5DECE]">
                        {ch.id}
                      </span>
                      <h4 className="font-serif-book font-bold text-sm sm:text-base text-[#203746] mt-2 mb-1">
                        {ch.title}
                      </h4>
                      <p className="font-serif-book text-xs text-[#203746]/70 leading-relaxed">
                        {ch.openIdea}
                      </p>
                    </div>
                    <div className="mt-3 pt-2 border-t border-[#E5DECE] text-[11px] font-semibold text-[#397D78] flex items-center justify-between">
                      <span>{isSelected ? 'Đang chọn nhiệm vụ này' : 'Bấm để chọn'}</span>
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Detailed Selected Challenge Steps */}
            {(() => {
              const currentCh = PRACTICAL_CHALLENGES.find((c) => c.id === state.selectedChallengeId) || PRACTICAL_CHALLENGES[0];
              return (
                <div className="p-5 bg-white rounded-xl border border-[#E5DECE] shadow-xs space-y-4">
                  <div className="border-b border-[#E5DECE] pb-3">
                    <span className="font-mono text-xs font-bold text-[#B66A50]">Nhiệm vụ {currentCh.id}</span>
                    <h3 className="font-serif-book font-bold text-lg text-[#203746]">
                      {currentCh.title}
                    </h3>
                    <p className="font-serif-book text-xs sm:text-sm text-[#203746]/80 mt-1">
                      <strong>Mục tiêu:</strong> {currentCh.mission}
                    </p>
                  </div>

                  <div className="p-3 bg-[#FAF7F0] rounded-lg border border-[#E5DECE] text-xs font-sans-ui text-[#203746]/80">
                    <strong className="text-[#397D78]">Gợi ý dễ thực hiện:</strong> {currentCh.easyTip}
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-serif-book font-bold text-sm text-[#203746]">
                      Các bước tiến hành:
                    </h4>
                    <div className="space-y-1.5 text-xs font-serif-book text-[#203746]/85 pl-2 leading-relaxed">
                      {currentCh.steps.map((st, idx) => (
                        <p key={idx}>{st}</p>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 bg-[#EAE3D2]/50 rounded-lg border border-[#D9D0BE] text-xs font-sans-ui text-[#203746]/80">
                    <strong>Sản phẩm bàn giao:</strong> {currentCh.deliverable}
                  </div>
                </div>
              );
            })()}

            {/* Shared Journal: 12 Questions */}
            <div className="p-5 bg-white rounded-xl border border-[#E5DECE] shadow-xs space-y-5">
              <div className="border-b border-[#E5DECE] pb-3">
                <h3 className="font-serif-book font-bold text-base sm:text-lg text-[#203746]">
                  Nhật ký dùng chung cho cả ba nhiệm vụ
                </h3>
                <p className="font-serif-book italic text-xs text-[#203746]/70 mt-0.5">
                  Ghi lại tiến trình từ lúc đặt câu hỏi, thực hiện, gặp khó khăn đến kết luận. Tự động lưu trên máy.
                </p>
              </div>

              <div className="space-y-4">
                {JOURNAL_QUESTIONS.map((jq) => {
                  const val = state.challengeJournal[jq.id] || '';
                  return (
                    <div key={jq.id} className="space-y-1.5">
                      <label className="block font-serif-book font-medium text-xs sm:text-sm text-[#203746]">
                        {jq.label}
                      </label>
                      <textarea
                        rows={2}
                        value={val}
                        onChange={(e) => onSaveJournalField(jq.id, e.target.value)}
                        onKeyDown={(e) => e.stopPropagation()}
                        placeholder="Ghi nhận câu trả lời của em..."
                        className="w-full p-2.5 bg-[#FAF7F0] rounded-lg border border-[#D9D0BE] text-xs font-serif-book text-[#203746] focus:outline-none focus:border-[#397D78] leading-relaxed resize-y"
                      />
                    </div>
                  );
                })}
              </div>

              {/* Bảng tự nhìn lại hành động */}
              <div className="pt-4 border-t border-[#E5DECE] space-y-3 font-sans-ui">
                <h4 className="font-serif-book font-bold text-sm text-[#203746]">
                  Bảng tự nhìn lại hành động
                </h4>
                <p className="text-xs text-[#203746]/70 italic">
                  Ghi việc cụ thể em đã làm hoặc đánh dấu "Chưa thực hiện":
                </p>

                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-[#FAF7F0] rounded-lg border border-[#E5DECE] space-y-1">
                    <span className="font-bold text-[#397D78]">1. Trực tiếp thực hiện:</span>
                    <p className="text-[11px] text-[#203746]/70">Thao tác, quan sát, đo, vẽ, lập trình hoặc làm mẫu nào do em thực hiện?</p>
                    <input
                      type="text"
                      value={state.challengeActionReview.directAction}
                      onChange={(e) => onSaveActionReview('directAction', e.target.value)}
                      onKeyDown={(e) => e.stopPropagation()}
                      placeholder="Ghi việc cụ thể hoặc 'Chưa thực hiện'..."
                      className="w-full p-2 bg-white rounded border border-[#D9D0BE] text-xs font-serif-book text-[#203746]"
                    />
                  </div>

                  <div className="p-3 bg-[#FAF7F0] rounded-lg border border-[#E5DECE] space-y-1">
                    <span className="font-bold text-[#B66A50]">2. Duy trì hoạt động:</span>
                    <p className="text-[11px] text-[#203746]/70">Em đã quay lại công việc, thử lại hoặc điều chỉnh bước nào khi gặp khó khăn?</p>
                    <input
                      type="text"
                      value={state.challengeActionReview.persistence}
                      onChange={(e) => onSaveActionReview('persistence', e.target.value)}
                      onKeyDown={(e) => e.stopPropagation()}
                      placeholder="Ghi việc cụ thể hoặc 'Chưa thực hiện'..."
                      className="w-full p-2 bg-white rounded border border-[#D9D0BE] text-xs font-serif-book text-[#203746]"
                    />
                  </div>

                  <div className="p-3 bg-[#FAF7F0] rounded-lg border border-[#E5DECE] space-y-1">
                    <span className="font-bold text-[#397D78]">3. Chủ động đóng góp:</span>
                    <p className="text-[11px] text-[#203746]/70">Em đã đề xuất, hỏi, giải thích hoặc tham gia quyết định nào?</p>
                    <input
                      type="text"
                      value={state.challengeActionReview.initiative}
                      onChange={(e) => onSaveActionReview('initiative', e.target.value)}
                      onKeyDown={(e) => e.stopPropagation()}
                      placeholder="Ghi việc cụ thể hoặc 'Chưa thực hiện'..."
                      className="w-full p-2 bg-white rounded border border-[#D9D0BE] text-xs font-serif-book text-[#203746]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: PHIẾU PHẢN HỒI (RUBRIC ĐÁNH GIÁ 4 TIÊU CHÍ) */}
        {activeTab === 'rubric' && (
          <div className="space-y-6 animate-fade-in font-sans-ui">
            <div className="p-4 bg-[#FAF7F0] rounded-xl border border-[#D9D0BE] space-y-1">
              <p className="font-serif-book font-bold text-sm text-[#203746]">
                Cách phản hồi nhiệm vụ cho giáo viên hoặc nhóm học tập:
              </p>
              <p className="font-serif-book italic text-xs sm:text-sm text-[#203746]/80 leading-relaxed">
                Không chấm mức độ yêu thích STEM hoặc ngưỡng mộ nhân vật. Sử dụng bốn câu hỏi sau để phản hồi sản phẩm thực hành. Trong phiên bản này, đây là phiếu tự kiểm hoặc phiếu in để giáo viên nhận xét trực tiếp.
              </p>
            </div>

            <div className="space-y-4">
              {TEACHER_RUBRIC_CRITERIA.map((crit) => {
                const currentRating = state.rubricRatings[crit.id];
                const levels: Array<'Đã thể hiện' | 'Cần làm rõ' | 'Chưa có minh chứng'> = [
                  'Đã thể hiện',
                  'Cần làm rõ',
                  'Chưa có minh chứng',
                ];

                return (
                  <div key={crit.id} className="p-4 bg-white rounded-xl border border-[#E5DECE] shadow-xs space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-[#E5DECE] pb-2">
                      <h4 className="font-serif-book font-bold text-sm sm:text-base text-[#203746]">
                        {crit.title}
                      </h4>
                      <p className="text-xs text-[#203746]/70 italic">
                        {crit.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-1 text-xs">
                      {levels.map((lvl) => (
                        <button
                          key={lvl}
                          onClick={() => onSetRubricRating(crit.id, lvl)}
                          className={`px-3 py-1.5 rounded-lg border font-medium cursor-pointer transition-colors ${
                            currentRating === lvl
                              ? lvl === 'Đã thể hiện'
                                ? 'bg-emerald-100 text-emerald-900 border-emerald-400 font-bold'
                                : lvl === 'Cần làm rõ'
                                ? 'bg-amber-100 text-amber-900 border-amber-400 font-bold'
                                : 'bg-slate-100 text-slate-800 border-slate-300 font-bold'
                              : 'bg-[#FAF7F0] border-[#D9D0BE] text-[#203746]/70 hover:bg-[#EAE3D2]'
                          }`}
                        >
                          {lvl}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Teacher Notes Area */}
            <div className="p-4 bg-white rounded-xl border border-[#E5DECE] shadow-xs space-y-2">
              <label className="block font-serif-book font-bold text-sm text-[#203746]">
                Nhận xét ngắn của giáo viên hoặc bạn học (Tùy chọn):
              </label>
              <textarea
                rows={3}
                value={state.rubricTeacherNotes}
                onChange={(e) => onSetRubricTeacherNotes(e.target.value)}
                onKeyDown={(e) => e.stopPropagation()}
                placeholder="Nhập nhận xét cụ thể giúp nhóm cải tiến sản phẩm..."
                className="w-full p-2.5 bg-[#FAF7F0] rounded-lg border border-[#D9D0BE] text-xs font-serif-book text-[#203746] focus:outline-none focus:border-[#397D78] leading-relaxed resize-y"
              />
            </div>
          </div>
        )}
      </div>

      {/* Activities Page Footer */}
      <div className="pt-6 border-t border-[#E5DECE] mt-8 flex justify-between items-center text-xs font-mono text-[#203746]/50 font-sans-ui">
        <span>ĐẾN LƯỢT EM BẮT ĐẦU</span>
        <span>Trang {pageNumber}</span>
      </div>

      {/* Confirmation Modal for Resetting Quiz */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs font-sans-ui">
          <div className="w-full max-w-sm bg-white rounded-xl p-5 shadow-2xl border border-[#D9D0BE] space-y-3">
            <h4 className="font-bold text-sm text-[#203746]">
              Xác nhận làm lại bài trắc nghiệm?
            </h4>
            <p className="text-xs text-[#203746]/80 leading-relaxed">
              Các lựa chọn trắc nghiệm sẽ được xóa để em thử sức lại từ đầu. Các bài viết suy ngẫm và nhật ký nhiệm vụ sẽ được giữ nguyên.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-3 py-1.5 text-xs text-[#203746]/70 hover:bg-[#EAE3D2] rounded cursor-pointer"
              >
                Hủy
              </button>
              <button
                onClick={() => {
                  onResetQuiz();
                  setShowResetConfirm(false);
                }}
                className="px-3 py-1.5 text-xs bg-[#397D78] text-white font-medium rounded hover:bg-[#2C625E] cursor-pointer"
              >
                Đồng ý làm lại
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal for Clearing All Personal Data */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs font-sans-ui">
          <div className="w-full max-w-sm bg-white rounded-xl p-5 shadow-2xl border border-[#D9D0BE] space-y-3">
            <h4 className="font-bold text-sm text-rose-700 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4" />
              <span>Xóa toàn bộ dữ liệu cá nhân?</span>
            </h4>
            <p className="text-xs text-[#203746]/80 leading-relaxed">
              Hành động này sẽ xóa toàn bộ câu trả lời suy ngẫm, kết quả trắc nghiệm và nhật ký đã nhập trên thiết bị này. Trước khi xóa, em có thể bấm "Tải phiếu của em (.md)" để lưu lại bản sao.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="px-3 py-1.5 text-xs text-[#203746]/70 hover:bg-[#EAE3D2] rounded cursor-pointer"
              >
                Giữ lại
              </button>
              <button
                onClick={() => {
                  onClearAll();
                  setShowClearConfirm(false);
                }}
                className="px-3 py-1.5 text-xs bg-rose-600 text-white font-medium rounded hover:bg-rose-700 cursor-pointer"
              >
                Xóa sạch dữ liệu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
