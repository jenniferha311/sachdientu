import React, { useState } from 'react';
import { X, Printer, CheckSquare, Square, Download, BookOpen } from 'lucide-react';
import { STORY_FIGURES, BOOK_METADATA } from '../data/bookContent';
import { QUIZ_QUESTIONS, FINAL_REFLECTIONS, JOURNAL_QUESTIONS, PRACTICAL_CHALLENGES } from '../data/activities';
import { UserLearningState } from '../types/book';

interface PrintWorksheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  state: UserLearningState;
}

export const PrintWorksheetModal: React.FC<PrintWorksheetModalProps> = ({
  isOpen,
  onClose,
  state,
}) => {
  const [includeAnswers, setIncludeAnswers] = useState(false);
  const [printSection, setPrintSection] = useState<'all' | 'quiz' | 'journal' | 'reflections'>('all');

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div 
        role="dialog"
        aria-label="In phiếu học tập"
        className="w-full max-w-4xl max-h-[90vh] bg-white rounded-xl shadow-2xl border border-slate-300 flex flex-col overflow-hidden text-slate-900"
      >
        {/* Controls Header - hidden in print */}
        <div className="no-print p-4 border-b border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Printer className="w-5 h-5 text-[#397D78]" />
            <h2 className="font-sans font-bold text-base text-slate-900">
              In phiếu học tập & Suy ngẫm
            </h2>
          </div>

          <div className="flex items-center gap-4 text-xs font-sans">
            {/* Teacher toggle: include quiz answers */}
            <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 select-none">
              <input
                type="checkbox"
                checked={includeAnswers}
                onChange={(e) => setIncludeAnswers(e.target.checked)}
                className="w-4 h-4 rounded text-[#397D78] focus:ring-[#397D78]"
              />
              <span className="font-semibold text-[#397D78]">In kèm đáp án trắc nghiệm (Dành cho giáo viên)</span>
            </label>

            {/* Print button */}
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-[#397D78] hover:bg-[#2C625E] text-white font-medium rounded-lg shadow-xs cursor-pointer flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>In ngay ra máy in / PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1 rounded text-slate-500 hover:text-slate-900 hover:bg-slate-200 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="flex-1 overflow-y-auto p-8 sm:p-12 font-serif text-slate-900 bg-white print-sheet">
          {/* Header block for printable sheet */}
          <div className="border-b-2 border-slate-900 pb-4 mb-6 text-center">
            <p className="font-sans text-xs tracking-wider uppercase font-bold text-slate-700">
              {BOOK_METADATA.organization}
            </p>
            <h1 className="text-xl sm:text-2xl font-bold mt-1 text-slate-900">
              PHIẾU HỌC TẬP VÀ SUY NGẪM TRẢI NGHIỆM STEM
            </h1>
            <p className="font-sans italic text-xs text-slate-600 mt-0.5">
              Tài liệu đồng hành cùng sách: "{BOOK_METADATA.title} - {BOOK_METADATA.subtitle}"
            </p>

            <div className="mt-4 pt-3 border-t border-dashed border-slate-300 grid grid-cols-2 gap-4 text-left font-sans text-xs">
              <p>Họ và tên học sinh / Nhóm: .............................................................</p>
              <p>Lớp: ........................ Trường: .....................................................</p>
            </div>
          </div>

          {/* Section 1: Reflections after stories */}
          {(printSection === 'all' || printSection === 'reflections') && (
            <div className="mb-8 space-y-4">
              <h2 className="font-sans font-bold text-sm uppercase tracking-wide bg-slate-100 p-2 border-l-4 border-[#397D78]">
                I. SUY NGẪM SAU TỪNG CÂU CHUYỆN ("Dừng lại một chút")
              </h2>
              <div className="space-y-4 text-xs">
                {STORY_FIGURES.map((fig) => {
                  const entry = state.reflections[fig.code];
                  return (
                    <div key={fig.id} className="p-3 border border-slate-200 rounded-sm space-y-1">
                      <p className="font-sans font-bold text-slate-900">
                        [{fig.code}] {fig.number}. {fig.name} ({fig.role})
                      </p>
                      <p className="italic text-slate-700">Câu hỏi: {fig.reflectionQuestion}</p>
                      <div className="mt-2 p-2 bg-slate-50 border border-slate-200 min-h-[40px] text-slate-800">
                        {entry && entry.answer && entry.answer.trim() ? (
                          <p>{entry.answer.trim()}</p>
                        ) : (
                          <p className="text-slate-400 italic">...................................................................................................................................</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Section 2: Final Reflections */}
          {(printSection === 'all' || printSection === 'reflections') && (
            <div className="mb-8 space-y-4 page-break">
              <h2 className="font-sans font-bold text-sm uppercase tracking-wide bg-slate-100 p-2 border-l-4 border-[#B66A50]">
                II. NHÌN LẠI CUỐI SÁCH (Chọn ít nhất 1 câu hỏi)
              </h2>
              <div className="space-y-4 text-xs">
                {FINAL_REFLECTIONS.map((p) => {
                  const text = state.finalReflections[p.id];
                  return (
                    <div key={p.id} className="p-3 border border-slate-200 rounded-sm space-y-1">
                      <p className="font-sans font-bold text-slate-900">
                        {p.id}. {p.title}
                      </p>
                      <p className="italic text-slate-700">{p.prompt}</p>
                      <div className="mt-2 p-3 bg-slate-50 border border-slate-200 min-h-[60px] text-slate-800">
                        {text && text.trim() ? (
                          <p>{text.trim()}</p>
                        ) : (
                          <p className="text-slate-400 italic">
                            ......................................................................................................................................................................<br />
                            ......................................................................................................................................................................
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Section 3: Quiz */}
          {(printSection === 'all' || printSection === 'quiz') && (
            <div className="mb-8 space-y-4 page-break">
              <div className="flex justify-between items-center bg-slate-100 p-2 border-l-4 border-[#397D78]">
                <h2 className="font-sans font-bold text-sm uppercase tracking-wide">
                  III. TRẮC NGHIỆM ĐỌC HIỂU ("Thử sức" - 12 câu)
                </h2>
                {state.quizSubmitted && (
                  <span className="font-sans font-bold text-xs text-[#397D78]">
                    Điểm số đã làm: {state.quizScore}/12 câu đúng
                  </span>
                )}
              </div>

              <div className="space-y-4 text-xs">
                {QUIZ_QUESTIONS.map((q, idx) => {
                  const userChoice = state.quizAnswers[q.id];
                  return (
                    <div key={q.id} className="p-2.5 border border-slate-200 rounded-sm space-y-1">
                      <p className="font-sans font-bold text-slate-900">
                        {idx + 1}. [{q.id}] {q.question}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 font-sans text-[11px] pl-3">
                        {q.options.map((opt) => (
                          <div key={opt.key} className="flex items-center gap-1.5">
                            <span className={`w-4 h-4 rounded border text-center font-bold text-[10px] leading-4 ${
                              userChoice === opt.key ? 'bg-slate-900 text-white' : 'border-slate-400'
                            }`}>
                              {opt.key}
                            </span>
                            <span>{opt.text}</span>
                          </div>
                        ))}
                      </div>

                      {includeAnswers && (
                        <div className="mt-2 p-2 bg-emerald-50 border border-emerald-200 text-emerald-950 font-sans text-[11px]">
                          <strong>Đáp án đúng: {q.correctKey}</strong> — {q.explanation} (Nhân vật: {q.figureName})
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Section 4: Practical Challenge Journal */}
          {(printSection === 'all' || printSection === 'journal') && (
            <div className="space-y-4 page-break">
              <h2 className="font-sans font-bold text-sm uppercase tracking-wide bg-slate-100 p-2 border-l-4 border-[#397D78]">
                IV. NHẬT KÝ THỬ THÁCH THỰC HÀNH ("Bắt đầu" - Nhiệm vụ {state.selectedChallengeId})
              </h2>

              <div className="space-y-3 text-xs">
                {JOURNAL_QUESTIONS.map((jq) => {
                  const val = state.challengeJournal[jq.id];
                  return (
                    <div key={jq.id} className="space-y-1">
                      <p className="font-sans font-semibold text-slate-900">{jq.label}</p>
                      <div className="p-2 bg-slate-50 border border-slate-200 min-h-[35px] text-slate-800">
                        {val && val.trim() ? (
                          <p>{val.trim()}</p>
                        ) : (
                          <p className="text-slate-400 italic">...................................................................................................................................</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
