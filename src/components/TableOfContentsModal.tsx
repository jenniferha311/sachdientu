import React from 'react';
import { X, Bookmark, BookOpen, Sparkles, ChevronRight } from 'lucide-react';
import { BOOK_PARTS, STORY_FIGURES } from '../data/bookContent';

interface TableOfContentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: number;
  bookmarks: number[];
  onNavigateToPage: (pageIndex: number) => void;
}

export const TableOfContentsModal: React.FC<TableOfContentsModalProps> = ({
  isOpen,
  onClose,
  currentPage,
  bookmarks,
  onNavigateToPage,
}) => {
  if (!isOpen) return null;

  const navigateAndClose = (pageIndex: number) => {
    onNavigateToPage(pageIndex);
    onClose();
  };

  // Helper map from figure code to page index in book
  // Pages layout:
  // 0: Bìa trước
  // 1: Tên sách & Đơn vị
  // 2: Lời ngỏ
  // 3: Mục lục
  // 4: Phần I
  // 5-9: Stories 1-5
  // 10: Phần II
  // 11-14: Stories 6-9
  // 15: Phần III
  // 16-29: Stories 10-23
  // 30: Lời kết
  // 31: Đến lượt em bắt đầu
  // 32: Bìa sau

  const getFigurePageIndex = (figNumber: number) => {
    if (figNumber <= 5) {
      return 4 + figNumber; // 1 -> 5, 5 -> 9
    } else if (figNumber <= 9) {
      return 10 + (figNumber - 5); // 6 -> 11, 9 -> 14
    } else {
      return 15 + (figNumber - 9); // 10 -> 16, 23 -> 29
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div 
        role="dialog" 
        aria-label="Mục lục sách"
        className="w-full max-w-2xl max-h-[85vh] bg-[#F7F3EA] rounded-xl shadow-2xl border border-[#D9D0BE] flex flex-col overflow-hidden text-[#203746]"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E5DECE] flex items-center justify-between bg-[#F0EBE0]">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#397D78]" />
            <h2 className="font-serif-book font-bold text-lg text-[#203746]">
              Mục lục sách
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-[#203746]/60 hover:text-[#203746] hover:bg-[#E5DECE] transition-colors cursor-pointer"
            title="Đóng mục lục"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Quick Bookmarks bar if any */}
          {bookmarks.length > 0 && (
            <div className="p-3 bg-[#EAE3D2]/60 rounded-lg border border-[#D9D0BE] text-xs font-sans-ui">
              <div className="flex items-center gap-1.5 font-semibold text-[#B66A50] mb-2">
                <Bookmark className="w-4 h-4 fill-[#B66A50]" />
                <span>Trang em đã đánh dấu:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {bookmarks.map((bm) => (
                  <button
                    key={bm}
                    onClick={() => navigateAndClose(bm)}
                    className="px-2.5 py-1 bg-white hover:bg-[#F3EFE6] border border-[#D9D0BE] rounded text-xs font-medium cursor-pointer transition-colors"
                  >
                    Trang {bm + 1}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Front Matter */}
          <div className="space-y-1 text-sm font-sans-ui">
            <button
              onClick={() => navigateAndClose(0)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-md transition-colors cursor-pointer text-left ${
                currentPage === 0 ? 'bg-[#397D78]/10 text-[#397D78] font-bold' : 'hover:bg-[#EAE3D2]'
              }`}
            >
              <span>1. Bìa trước</span>
              <span className="text-xs text-[#203746]/60 font-mono">Trang 1</span>
            </button>
            <button
              onClick={() => navigateAndClose(1)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-md transition-colors cursor-pointer text-left ${
                currentPage === 1 ? 'bg-[#397D78]/10 text-[#397D78] font-bold' : 'hover:bg-[#EAE3D2]'
              }`}
            >
              <span>2. Trang tên sách & Câu lạc bộ STEM EMGIS Tỉnh Phú Thọ</span>
              <span className="text-xs text-[#203746]/60 font-mono">Trang 2</span>
            </button>
            <button
              onClick={() => navigateAndClose(2)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-md transition-colors cursor-pointer text-left ${
                currentPage === 2 ? 'bg-[#397D78]/10 text-[#397D78] font-bold' : 'hover:bg-[#EAE3D2]'
              }`}
            >
              <span>3. Lời ngỏ nguyên văn</span>
              <span className="text-xs text-[#203746]/60 font-mono">Trang 3</span>
            </button>
          </div>

          {/* 3 Main Parts */}
          {BOOK_PARTS.map((part) => (
            <div key={part.id} className="border-t border-[#E5DECE] pt-4">
              <button
                onClick={() => {
                  const partPage = part.id === 1 ? 4 : part.id === 2 ? 10 : 15;
                  navigateAndClose(partPage);
                }}
                className="w-full text-left group mb-2 cursor-pointer flex items-baseline justify-between"
              >
                <div>
                  <h3 className="font-serif-book font-bold text-base text-[#397D78] group-hover:underline">
                    Phần {part.roman}. {part.title}
                  </h3>
                  <p className="text-xs italic text-[#203746]/70 font-serif-book">
                    {part.subtitle}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-[#397D78]/60 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <div className="space-y-1 ml-2 font-sans-ui text-sm">
                {STORY_FIGURES.filter((fig) => fig.partId === part.id).map((fig) => {
                  const pIndex = getFigurePageIndex(fig.number);
                  const isCurrent = currentPage === pIndex;
                  return (
                    <button
                      key={fig.id}
                      onClick={() => navigateAndClose(pIndex)}
                      className={`w-full flex items-center justify-between px-3 py-1.5 rounded-md text-left transition-colors cursor-pointer ${
                        isCurrent
                          ? 'bg-[#397D78]/10 text-[#397D78] font-semibold'
                          : 'hover:bg-[#EAE3D2] text-[#203746]'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate pr-2">
                        <span className="font-mono text-xs text-[#B66A50] font-semibold">
                          {String(fig.number).padStart(2, '0')}.
                        </span>
                        <span className="truncate">{fig.name}</span>
                        <span className="hidden sm:inline text-xs text-[#203746]/50 truncate">
                          · {fig.storyTitle}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-[#203746]/50 shrink-0">
                        Trang {pIndex + 1}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Back Matter */}
          <div className="border-t border-[#E5DECE] pt-4 space-y-1 text-sm font-sans-ui">
            <button
              onClick={() => navigateAndClose(30)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-md transition-colors cursor-pointer text-left ${
                currentPage === 30 ? 'bg-[#397D78]/10 text-[#397D78] font-bold' : 'hover:bg-[#EAE3D2]'
              }`}
            >
              <span>Lời kết</span>
              <span className="text-xs text-[#203746]/60 font-mono">Trang 31</span>
            </button>
            <button
              onClick={() => navigateAndClose(31)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-md transition-colors cursor-pointer text-left ${
                currentPage === 31 ? 'bg-[#B66A50]/15 text-[#B66A50] font-bold' : 'hover:bg-[#EAE3D2] text-[#B66A50]'
              }`}
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#B66A50]" />
                <span className="font-semibold">Đến lượt em bắt đầu (Hoạt động tương tác)</span>
              </div>
              <span className="text-xs font-mono">Trang 32</span>
            </button>
            <button
              onClick={() => navigateAndClose(32)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-md transition-colors cursor-pointer text-left ${
                currentPage === 32 ? 'bg-[#397D78]/10 text-[#397D78] font-bold' : 'hover:bg-[#EAE3D2]'
              }`}
            >
              <span>Bìa sau</span>
              <span className="text-xs text-[#203746]/60 font-mono">Trang 33</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-[#E5DECE] bg-[#F0EBE0] text-xs text-[#203746]/70 flex items-center justify-between font-sans-ui">
          <span>Câu lạc bộ STEM EMGIS · Tỉnh Phú Thọ</span>
          <button
            onClick={onClose}
            className="px-3 py-1 bg-[#397D78] hover:bg-[#2C625E] text-white rounded font-medium cursor-pointer transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
