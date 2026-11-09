import React, { useState, useEffect } from 'react';
import { StoryFigure } from '../types/book';
import { 
  Check, 
  Clock, 
  HelpCircle, 
  Bookmark, 
  RotateCcw,
  Sparkles,
  Info
} from 'lucide-react';

interface StoryPageProps {
  figure: StoryFigure;
  pageNumber: number;
  fontSize: number;
  savedReflection?: {
    answer: string;
    savedAt?: string;
    status: 'saved' | 'later' | 'empty';
  };
  onSaveReflection: (code: string, answer: string, status: 'saved' | 'later' | 'empty') => void;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
}

export const StoryPage: React.FC<StoryPageProps> = ({
  figure,
  pageNumber,
  fontSize,
  savedReflection,
  onSaveReflection,
  isBookmarked,
  onToggleBookmark,
}) => {
  const [reflectionText, setReflectionText] = useState(savedReflection?.answer || '');
  const [saveToast, setSaveToast] = useState(false);

  // Sync if savedReflection changes from outer storage
  useEffect(() => {
    if (savedReflection?.answer !== undefined && savedReflection.answer !== reflectionText) {
      setReflectionText(savedReflection.answer);
    }
  }, [savedReflection?.answer]);

  const handleSave = (status: 'saved' | 'later' = 'saved') => {
    onSaveReflection(figure.code, reflectionText, status);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2000);
  };

  const [firstPara, ...restParas] = figure.paragraphs;
  const firstLetter = firstPara.charAt(0);
  const remainingFirstPara = firstPara.slice(1);

  return (
    <div className="w-full h-full min-h-[580px] p-6 sm:p-10 md:p-12 bg-[#F7F3EA] text-[#203746] flex flex-col justify-between overflow-y-auto">
      <div>
        {/* Story Top Metadata Header */}
        <div className="border-b border-[#E5DECE] pb-3 mb-5 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-sans-ui text-[#397D78] font-semibold uppercase tracking-wider">
              <span>{figure.partName}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono text-[#B66A50]">Bài {String(figure.number).padStart(2, '0')}</span>
            </div>
            <h2 className="font-serif-book font-bold text-2xl sm:text-3xl text-[#203746] mt-1">
              {figure.name}
            </h2>
            {figure.nativeName && figure.nativeName !== figure.name && (
              <p className="text-xs font-serif-book text-[#203746]/60 italic">
                Tên gốc: {figure.nativeName}
              </p>
            )}
            <p className="text-xs sm:text-sm font-sans-ui text-[#203746]/70 mt-1">
              {figure.role} · <span className="italic">{figure.organizationOrContext}</span>
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onToggleBookmark}
              title={isBookmarked ? 'Bỏ đánh dấu trang' : 'Đánh dấu trang này'}
              className={`p-1.5 rounded border transition-colors cursor-pointer ${
                isBookmarked 
                  ? 'bg-[#B66A50] text-white border-[#B66A50]' 
                  : 'border-[#D9D0BE] text-[#203746]/60 hover:bg-[#EAE3D2]'
              }`}
            >
              <Bookmark className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Story Title & Quote Banner */}
        <div className="mb-6 p-4 rounded-lg bg-[#F0EBE0] border-l-3 border-[#397D78] space-y-1">
          <h3 className="font-serif-book font-bold text-base sm:text-lg text-[#203746]">
            {figure.storyTitle}
          </h3>
          <p className="font-serif-book italic text-xs sm:text-sm text-[#397D78] leading-relaxed">
            "{figure.summaryQuote}"
          </p>
        </div>

        {/* Document Portrait Status Note (No fake AI images, transparent neutral indicator) */}
        <div className="mb-6 p-2.5 rounded bg-[#FAF7F0] border border-[#E5DECE] flex items-center gap-2.5 text-xs font-sans-ui text-[#203746]/70">
          <div className="w-7 h-7 rounded-full bg-[#397D78]/10 text-[#397D78] flex items-center justify-center shrink-0">
            <Info className="w-4 h-4" />
          </div>
          <p className="truncate">
            <span className="font-medium text-[#203746]">{figure.portraitNote}</span>
          </p>
        </div>

        {/* Story Content Paragraphs */}
        <div 
          className="space-y-4 font-serif-book text-[#203746]/90 text-left leading-[1.65]"
          style={{ fontSize: `${fontSize}px` }}
        >
          <p>
            <span className="float-left text-4xl sm:text-5xl font-black font-serif-book text-[#397D78] pr-2 pt-1 leading-none">
              {firstLetter}
            </span>
            {remainingFirstPara}
          </p>

          {restParas.map((para, idx) => (
            <p key={idx} className="indent-6">
              {para}
            </p>
          ))}
        </div>

        {/* Section 10.2: "Dừng lại một chút" (Pause for a moment) interactive reflection card */}
        <div className="mt-8 pt-6 border-t border-[#E5DECE]">
          <div className="bg-[#FAF7F0] border border-[#D9D0BE] rounded-xl p-5 shadow-xs space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E5DECE] pb-2.5">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-[#B66A50]/15 text-[#B66A50] font-mono text-xs font-bold">
                  {figure.code}
                </span>
                <h4 className="font-serif-book font-bold text-sm sm:text-base text-[#203746]">
                  Dừng lại một chút
                </h4>
              </div>

              {/* Status pill */}
              <div className="text-xs font-sans-ui flex items-center gap-1.5">
                {savedReflection?.status === 'saved' && (
                  <span className="text-emerald-700 flex items-center gap-1 font-medium">
                    <Check className="w-3.5 h-3.5" /> Đã lưu câu trả lời
                  </span>
                )}
                {savedReflection?.status === 'later' && (
                  <span className="text-[#B66A50] flex items-center gap-1 font-medium">
                    <Clock className="w-3.5 h-3.5" /> Ghi chú để sau
                  </span>
                )}
                {(!savedReflection || savedReflection.status === 'empty') && (
                  <span className="text-[#203746]/50 italic">
                    Chưa trả lời
                  </span>
                )}
              </div>
            </div>

            {/* Instruction */}
            <p className="text-xs font-serif-book italic text-[#203746]/75">
              Bạn có thể viết 2–4 câu. Hãy dùng một chi tiết trong câu chuyện để giải thích suy nghĩ của mình. Bạn được quyền chưa có câu trả lời ngay.
            </p>

            {/* Reflection question */}
            <p className="text-xs sm:text-sm font-serif-book font-medium text-[#203746] leading-relaxed">
              {figure.reflectionQuestion}
            </p>

            {/* Interactive textarea with input isolation */}
            <div className="relative">
              <textarea
                value={reflectionText}
                onChange={(e) => setReflectionText(e.target.value)}
                onKeyDown={(e) => {
                  // Crucial: Stop arrow keys from bubbling to flipbook container while typing!
                  if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Space'].includes(e.code)) {
                    e.stopPropagation();
                  }
                }}
                rows={3}
                placeholder="Nhập 2–4 câu suy ngẫm của bạn tại đây..."
                className="w-full p-3 bg-white rounded-lg border border-[#D9D0BE] text-xs sm:text-sm font-serif-book text-[#203746] focus:outline-none focus:border-[#397D78] focus:ring-1 focus:ring-[#397D78] leading-relaxed transition-all resize-y"
              />
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 font-sans-ui text-xs">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleSave('saved')}
                  className="px-3.5 py-1.5 rounded-md bg-[#397D78] hover:bg-[#2C625E] text-white font-medium shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Lưu suy ngẫm</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleSave('later')}
                  className="px-3 py-1.5 rounded-md bg-[#EAE3D2] hover:bg-[#D9D0BE] text-[#203746] font-medium transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>Để sau</span>
                </button>
              </div>

              {saveToast && (
                <span className="text-emerald-700 font-medium animate-fade-in text-[11px]">
                  ✓ Đã lưu thành công trên trình duyệt
                </span>
              )}

              {reflectionText && (
                <button
                  type="button"
                  onClick={() => {
                    setReflectionText('');
                    onSaveReflection(figure.code, '', 'empty');
                  }}
                  className="text-[#203746]/50 hover:text-[#B66A50] text-[11px] flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Xóa ô này</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Story Footer with Page Number */}
      <div className="pt-6 border-t border-[#E5DECE] mt-8 flex justify-between items-center text-xs font-mono text-[#203746]/50 font-sans-ui">
        <span className="truncate max-w-[200px] sm:max-w-xs">{figure.name}</span>
        <span>Trang {pageNumber}</span>
      </div>
    </div>
  );
};
