import React from 'react';
import { BOOK_PARTS, STORY_FIGURES } from '../data/bookContent';
import { BookOpen, Sparkles, ChevronRight } from 'lucide-react';

interface TableOfContentsPageProps {
  onNavigateToPage: (pageIndex: number) => void;
  pageNumber: number;
}

export const TableOfContentsPage: React.FC<TableOfContentsPageProps> = ({
  onNavigateToPage,
  pageNumber,
}) => {
  const getFigurePageIndex = (figNumber: number) => {
    if (figNumber <= 5) return 4 + figNumber;
    if (figNumber <= 9) return 10 + (figNumber - 5);
    return 15 + (figNumber - 9);
  };

  return (
    <div className="w-full h-full min-h-[580px] p-6 sm:p-10 md:p-12 bg-[#F7F3EA] text-[#203746] flex flex-col justify-between overflow-y-auto">
      <div>
        {/* Header */}
        <div className="border-b border-[#E5DECE] pb-3 mb-4">
          <span className="font-sans-ui text-xs uppercase tracking-widest text-[#397D78] font-bold">
            MỤC LỤC
          </span>
          <h2 className="font-serif-book font-bold text-2xl sm:text-3xl text-[#203746] mt-1">
            Các câu chuyện trong sách
          </h2>
          <p className="font-serif-book italic text-xs sm:text-sm text-[#203746]/70 mt-0.5">
            Mục lục tương tác: Bấm vào bất kỳ đề mục nào để lật ngay tới bài đó.
          </p>
        </div>

        {/* List of items */}
        <div className="space-y-4 text-xs sm:text-sm font-sans-ui">
          {/* Front matter */}
          <div className="pb-2 border-b border-[#E5DECE] space-y-1">
            <button
              onClick={() => onNavigateToPage(2)}
              className="w-full flex items-center justify-between py-1 px-2 rounded hover:bg-[#EAE3D2] transition-colors cursor-pointer text-left font-serif-book"
            >
              <span className="font-semibold text-[#203746]">Lời ngỏ</span>
              <span className="font-mono text-xs text-[#203746]/50">Trang 3</span>
            </button>
          </div>

          {/* Parts */}
          {BOOK_PARTS.map((part) => {
            const partStartPage = part.id === 1 ? 4 : part.id === 2 ? 10 : 15;
            const figures = STORY_FIGURES.filter((f) => f.partId === part.id);

            return (
              <div key={part.id} className="space-y-1.5">
                <button
                  onClick={() => onNavigateToPage(partStartPage)}
                  className="w-full flex items-center justify-between py-1 px-2 rounded bg-[#FAF7F0] hover:bg-[#EAE3D2] transition-colors cursor-pointer text-left border border-[#E5DECE]"
                >
                  <div>
                    <span className="font-bold text-xs uppercase tracking-wider text-[#397D78]">
                      Phần {part.roman}. {part.title}
                    </span>
                    <p className="font-serif-book italic text-xs text-[#203746]/70">
                      {part.subtitle}
                    </p>
                  </div>
                  <span className="font-mono text-xs text-[#203746]/50">
                    Trang {partStartPage + 1}
                  </span>
                </button>

                <div className="pl-3 space-y-1 font-serif-book">
                  {figures.map((fig) => {
                    const pIdx = getFigurePageIndex(fig.number);
                    return (
                      <button
                        key={fig.id}
                        onClick={() => onNavigateToPage(pIdx)}
                        className="w-full flex items-center justify-between py-1 px-2 rounded hover:bg-[#EAE3D2]/70 transition-colors cursor-pointer text-left text-xs"
                      >
                        <div className="flex items-center gap-2 truncate pr-2">
                          <span className="font-mono font-bold text-[#B66A50]">
                            {String(fig.number).padStart(2, '0')}.
                          </span>
                          <span className="font-semibold text-[#203746] truncate">
                            {fig.name}
                          </span>
                          <span className="hidden sm:inline text-[#203746]/60 truncate">
                            · {fig.storyTitle}
                          </span>
                        </div>
                        <span className="font-mono text-[#203746]/50 shrink-0">
                          Trang {pIdx + 1}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* End activities */}
          <div className="pt-2 border-t border-[#E5DECE] space-y-1 font-serif-book">
            <button
              onClick={() => onNavigateToPage(30)}
              className="w-full flex items-center justify-between py-1 px-2 rounded hover:bg-[#EAE3D2] transition-colors cursor-pointer text-left"
            >
              <span className="font-semibold text-[#203746]">Lời kết</span>
              <span className="font-mono text-xs text-[#203746]/50">Trang 31</span>
            </button>
            <button
              onClick={() => onNavigateToPage(31)}
              className="w-full flex items-center justify-between py-1.5 px-2 rounded bg-[#FAF7F0] hover:bg-[#EAE3D2] transition-colors cursor-pointer text-left border border-[#B66A50]/30"
            >
              <div className="flex items-center gap-2 text-[#B66A50] font-bold">
                <Sparkles className="w-4 h-4 text-[#B66A50]" />
                <span>Đến lượt em bắt đầu (Hoạt động tương tác)</span>
              </div>
              <span className="font-mono text-xs text-[#B66A50]">Trang 32</span>
            </button>
            <button
              onClick={() => onNavigateToPage(32)}
              className="w-full flex items-center justify-between py-1 px-2 rounded hover:bg-[#EAE3D2] transition-colors cursor-pointer text-left"
            >
              <span className="font-semibold text-[#203746]">Bìa sau</span>
              <span className="font-mono text-xs text-[#203746]/50">Trang 33</span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-4 border-t border-[#E5DECE] mt-6 flex justify-between items-center text-xs font-mono text-[#203746]/50 font-sans-ui">
        <span>MỤC LỤC</span>
        <span>Trang {pageNumber}</span>
      </div>
    </div>
  );
};
