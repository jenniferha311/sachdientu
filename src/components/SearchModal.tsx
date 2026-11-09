import React, { useState, useMemo } from 'react';
import { Search, X, ChevronRight, User, BookOpen } from 'lucide-react';
import { STORY_FIGURES, BOOK_PARTS } from '../data/bookContent';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToPage: (pageIndex: number) => void;
}

// Utility for accent-insensitive search in Vietnamese
function removeVietnameseTones(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase();
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onNavigateToPage,
}) => {
  const [query, setQuery] = useState('');

  const getFigurePageIndex = (figNumber: number) => {
    if (figNumber <= 5) return 4 + figNumber;
    if (figNumber <= 9) return 10 + (figNumber - 5);
    return 15 + (figNumber - 9);
  };

  const results = useMemo(() => {
    const q = query.trim();
    if (!q) return [];
    const normalizedQuery = removeVietnameseTones(q);

    const matches: Array<{
      figureId: string;
      figureName: string;
      figureNumber: number;
      partName: string;
      storyTitle: string;
      pageIndex: number;
      snippet: string;
      matchType: 'Tên nhân vật' | 'Tiêu đề' | 'Nội dung' | 'Câu hỏi suy ngẫm';
    }> = [];

    STORY_FIGURES.forEach((fig) => {
      const pageIndex = getFigurePageIndex(fig.number);
      const normName = removeVietnameseTones(fig.name);
      const normNative = fig.nativeName ? removeVietnameseTones(fig.nativeName) : '';
      const normTitle = removeVietnameseTones(fig.storyTitle);
      const normQuestion = removeVietnameseTones(fig.reflectionQuestion);

      if (normName.includes(normalizedQuery) || normNative.includes(normalizedQuery)) {
        matches.push({
          figureId: fig.id,
          figureName: fig.name,
          figureNumber: fig.number,
          partName: fig.partName,
          storyTitle: fig.storyTitle,
          pageIndex,
          snippet: `${fig.role} · ${fig.organizationOrContext}`,
          matchType: 'Tên nhân vật',
        });
        return;
      }

      if (normTitle.includes(normalizedQuery)) {
        matches.push({
          figureId: fig.id,
          figureName: fig.name,
          figureNumber: fig.number,
          partName: fig.partName,
          storyTitle: fig.storyTitle,
          pageIndex,
          snippet: fig.summaryQuote,
          matchType: 'Tiêu đề',
        });
        return;
      }

      // Check in paragraphs
      let paragraphMatch = '';
      for (const p of fig.paragraphs) {
        const normP = removeVietnameseTones(p);
        const idx = normP.indexOf(normalizedQuery);
        if (idx !== -1) {
          const start = Math.max(0, idx - 40);
          const end = Math.min(p.length, idx + query.length + 60);
          paragraphMatch = (start > 0 ? '...' : '') + p.slice(start, end) + (end < p.length ? '...' : '');
          break;
        }
      }

      if (paragraphMatch) {
        matches.push({
          figureId: fig.id,
          figureName: fig.name,
          figureNumber: fig.number,
          partName: fig.partName,
          storyTitle: fig.storyTitle,
          pageIndex,
          snippet: paragraphMatch,
          matchType: 'Nội dung',
        });
        return;
      }

      if (normQuestion.includes(normalizedQuery)) {
        matches.push({
          figureId: fig.id,
          figureName: fig.name,
          figureNumber: fig.number,
          partName: fig.partName,
          storyTitle: fig.storyTitle,
          pageIndex,
          snippet: fig.reflectionQuestion,
          matchType: 'Câu hỏi suy ngẫm',
        });
      }
    });

    return matches;
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div 
        role="dialog"
        aria-label="Tìm kiếm nội dung sách"
        className="w-full max-w-xl max-h-[80vh] bg-[#F7F3EA] rounded-xl shadow-2xl border border-[#D9D0BE] flex flex-col overflow-hidden text-[#203746]"
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#E5DECE] bg-[#F0EBE0] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#397D78] shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm theo tên nhân vật, địa danh, khoa học..."
            autoFocus
            className="flex-1 bg-transparent border-none text-[#203746] text-sm sm:text-base focus:outline-none placeholder:text-[#203746]/40 font-sans-ui"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[#203746]/50 hover:text-[#203746] p-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs px-2.5 py-1 rounded bg-[#E5DECE] hover:bg-[#D9D0BE] text-[#203746] font-medium cursor-pointer transition-colors"
          >
            Đóng
          </button>
        </div>

        {/* Search Results */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {query.trim() === '' ? (
            <div className="py-8 text-center text-xs text-[#203746]/50 font-sans-ui space-y-2">
              <p>Gõ từ khóa để tra cứu toàn bộ 23 câu chuyện trong sách.</p>
              <p className="italic">Gợi ý: "Tô Thị Như Quỳnh", "Radium", "vỏ tôm", "quỹ đạo", "robotics", "DNA", "AI"...</p>
            </div>
          ) : results.length === 0 ? (
            <div className="py-8 text-center text-sm text-[#203746]/60 font-sans-ui">
              Không tìm thấy kết quả phù hợp với từ khóa "{query}".
            </div>
          ) : (
            <div className="space-y-2">
              <div className="text-xs text-[#203746]/60 font-sans-ui px-1 mb-2">
                Tìm thấy {results.length} kết quả:
              </div>
              {results.map((res) => (
                <button
                  key={`${res.figureId}-${res.matchType}`}
                  onClick={() => {
                    onNavigateToPage(res.pageIndex);
                    onClose();
                  }}
                  className="w-full text-left p-3 rounded-lg border border-[#E5DECE] bg-white hover:border-[#397D78] hover:shadow-xs transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between text-xs font-sans-ui text-[#203746]/60 mb-1">
                    <span className="font-medium text-[#397D78]">{res.partName}</span>
                    <span className="font-mono text-[#B66A50]">Trang {res.pageIndex + 1}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-serif-book font-bold text-sm text-[#203746] group-hover:text-[#397D78] transition-colors">
                      {res.figureNumber}. {res.figureName}
                    </span>
                    <span className="text-xs text-[#203746]/50">· {res.storyTitle}</span>
                  </div>
                  <p className="text-xs font-serif-book text-[#203746]/80 line-clamp-2">
                    {res.snippet}
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
