import React from 'react';
import { 
  BookOpen, 
  Search, 
  ListFilter, 
  Sparkles, 
  Bookmark, 
  Columns, 
  AlignJustify, 
  Type, 
  FileCheck2,
  Printer
} from 'lucide-react';

interface BookNavbarProps {
  currentPage: number;
  totalPages: number;
  readingMode: 'flip' | 'continuous';
  fontSize: number;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  onSetReadingMode: (mode: 'flip' | 'continuous') => void;
  onSetFontSize: (size: number) => void;
  onOpenTOC: () => void;
  onOpenSearch: () => void;
  onOpenActivities: () => void;
  onOpenReport: () => void;
  onOpenPrint: () => void;
  onGoToCover: () => void;
}

export const BookNavbar: React.FC<BookNavbarProps> = ({
  currentPage,
  totalPages,
  readingMode,
  fontSize,
  isBookmarked,
  onToggleBookmark,
  onSetReadingMode,
  onSetFontSize,
  onOpenTOC,
  onOpenSearch,
  onOpenActivities,
  onOpenReport,
  onOpenPrint,
  onGoToCover,
}) => {
  return (
    <header className="no-print sticky top-0 z-40 bg-[#FAF7F0]/95 backdrop-blur-md border-b border-[#E5DECE] text-[#203746] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4 md:gap-8">
        {/* Zone 1: Brand title wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onGoToCover}
            title="Về trang bìa"
            className="flex items-center gap-2 group text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-[#397D78] rounded-sm py-1"
          >
            <BookOpen className="w-5 h-5 text-[#397D78] group-hover:scale-105 transition-transform" />
            <span className="font-serif-book font-bold text-sm sm:text-base tracking-tight text-[#203746] whitespace-nowrap">
              CÔ ẤY ĐÃ BẮT ĐẦU NHƯ THẾ
            </span>
          </button>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-sans-ui text-[#203746]/80 overflow-x-auto py-1 scrollbar-none">
          <button
            onClick={onOpenTOC}
            className="px-2.5 py-1.5 rounded-md hover:bg-[#EAE3D2] transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
            title="Mở mục lục sách"
          >
            <ListFilter className="w-4 h-4 text-[#397D78]" />
            <span className="hidden md:inline">Mục lục</span>
          </button>

          <button
            onClick={onOpenSearch}
            className="px-2.5 py-1.5 rounded-md hover:bg-[#EAE3D2] transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
            title="Tìm kiếm nhân vật và từ khóa"
          >
            <Search className="w-4 h-4 text-[#397D78]" />
            <span className="hidden md:inline">Tìm kiếm</span>
          </button>

          <button
            onClick={onOpenActivities}
            className="px-2.5 py-1.5 rounded-md hover:bg-[#EAE3D2] transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 text-[#B66A50] font-medium cursor-pointer"
            title="Mở hoạt động: Đến lượt em bắt đầu"
          >
            <Sparkles className="w-4 h-4 text-[#B66A50]" />
            <span>Đến lượt em</span>
          </button>

          <button
            onClick={onOpenReport}
            className="px-2.5 py-1.5 rounded-md hover:bg-[#EAE3D2] transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer text-[#397D78]"
            title="Bảng kiểm kê bàn giao và nạp DOCX"
          >
            <FileCheck2 className="w-4 h-4" />
            <span className="hidden lg:inline">Kiểm kê & Nguồn</span>
          </button>

          <button
            onClick={onOpenPrint}
            className="px-2.5 py-1.5 rounded-md hover:bg-[#EAE3D2] transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
            title="In sách hoặc phiếu học tập"
          >
            <Printer className="w-4 h-4 text-[#397D78]" />
            <span className="hidden lg:inline">In phiếu</span>
          </button>
        </nav>

        {/* Zone 3: Reading Controls & Mode Switch */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 font-sans-ui text-xs">
          {/* Bookmark */}
          <button
            onClick={onToggleBookmark}
            title={isBookmarked ? 'Bỏ đánh dấu trang này' : 'Đánh dấu trang này'}
            className={`p-1.5 rounded-md border transition-colors cursor-pointer ${
              isBookmarked
                ? 'bg-[#B66A50] text-white border-[#B66A50]'
                : 'border-[#D9D0BE] text-[#203746]/70 hover:bg-[#EAE3D2]'
            }`}
          >
            <Bookmark className="w-4 h-4" />
          </button>

          {/* Mode switch */}
          <div className="hidden sm:flex items-center bg-[#EAE3D2] p-0.5 rounded-md border border-[#D9D0BE]">
            <button
              onClick={() => onSetReadingMode('flip')}
              title="Chế độ lật trang"
              className={`px-2 py-1 rounded text-xs transition-colors cursor-pointer flex items-center gap-1 ${
                readingMode === 'flip'
                  ? 'bg-white text-[#203746] shadow-xs font-medium'
                  : 'text-[#203746]/70 hover:text-[#203746]'
              }`}
            >
              <Columns className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">Sách lật</span>
            </button>
            <button
              onClick={() => onSetReadingMode('continuous')}
              title="Chế độ đọc liên tục"
              className={`px-2 py-1 rounded text-xs transition-colors cursor-pointer flex items-center gap-1 ${
                readingMode === 'continuous'
                  ? 'bg-white text-[#203746] shadow-xs font-medium'
                  : 'text-[#203746]/70 hover:text-[#203746]'
              }`}
            >
              <AlignJustify className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">Cuộn dọc</span>
            </button>
          </div>

          {/* Font size adjustments */}
          <div className="flex items-center bg-[#EAE3D2] rounded-md border border-[#D9D0BE] p-0.5">
            <button
              onClick={() => onSetFontSize(fontSize - 2)}
              disabled={fontSize <= 14}
              title="Giảm cỡ chữ"
              className="px-1.5 py-1 text-xs text-[#203746]/80 hover:text-[#203746] disabled:opacity-30 cursor-pointer"
            >
              A-
            </button>
            <span className="px-1 text-[11px] font-mono tabular-nums text-[#203746]/60">
              {fontSize}
            </span>
            <button
              onClick={() => onSetFontSize(fontSize + 2)}
              disabled={fontSize >= 24}
              title="Tăng cỡ chữ"
              className="px-1.5 py-1 text-xs text-[#203746]/80 hover:text-[#203746] disabled:opacity-30 cursor-pointer"
            >
              A+
            </button>
          </div>

          {/* Current Page Tag */}
          <div className="hidden md:block text-xs font-mono tabular-nums text-[#203746]/60 pl-1">
            Trang {currentPage + 1}/{totalPages}
          </div>
        </div>
      </div>
    </header>
  );
};
