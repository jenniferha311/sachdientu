import React from 'react';
import { ArrowRight, Compass } from 'lucide-react';
import { BOOK_METADATA } from '../data/bookContent';

interface BookCoverProps {
  onOpenBook: () => void;
}

export const BookCover: React.FC<BookCoverProps> = ({ onOpenBook }) => {
  return (
    <div className="w-full h-full min-h-[580px] sm:min-h-[640px] md:min-h-[700px] flex flex-col justify-between p-8 sm:p-12 md:p-14 bg-[#F7F3EA] border border-[#E0D8C6] shadow-xl relative overflow-hidden select-none">
      {/* Subtle paper texture overlay & book spine shadow */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-black/5 via-transparent to-black/3" />
      <div className="absolute top-0 bottom-0 left-0 w-4 bg-gradient-to-r from-[#203746]/20 to-transparent pointer-events-none" />

      {/* Decorative celestial orbit & botanical geometric SVG in background */}
      <div className="absolute -right-20 -top-20 w-80 h-80 opacity-10 pointer-events-none">
        <svg viewBox="0 0 200 200" className="w-full h-full text-[#397D78] stroke-current fill-none" strokeWidth="1">
          <circle cx="100" cy="100" r="90" strokeDasharray="4 4" />
          <circle cx="100" cy="100" r="70" />
          <ellipse cx="100" cy="100" rx="90" ry="35" transform="rotate(30 100 100)" />
          <ellipse cx="100" cy="100" rx="90" ry="35" transform="rotate(-30 100 100)" />
        </svg>
      </div>

      <div className="absolute -left-12 -bottom-12 w-64 h-64 opacity-8 pointer-events-none">
        <svg viewBox="0 0 200 200" className="w-full h-full text-[#B66A50] stroke-current fill-none" strokeWidth="1.2">
          {/* Geometrical seed & leaf spiral */}
          <path d="M100,10 C150,10 190,50 190,100 C190,150 150,190 100,190 C50,190 10,150 10,100" />
          <path d="M100,30 C140,30 170,60 170,100 C170,140 140,170 100,170" />
          <path d="M100,50 C130,50 150,70 150,100 C150,130 130,150 100,150" />
        </svg>
      </div>

      {/* Top Header Tag */}
      <div className="relative z-10 flex items-center justify-between border-b border-[#397D78]/20 pb-4">
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-[#397D78]" />
          <span className="font-sans-ui text-xs tracking-wider uppercase font-semibold text-[#397D78]">
            Sách Chuyên Đề Giáo Dục STEM
          </span>
        </div>
        <span className="font-mono text-xs text-[#203746]/60">2026</span>
      </div>

      {/* Main Title Center: 3 lines prominent */}
      <div className="relative z-10 my-auto py-6 sm:py-8 space-y-4">
        <div className="space-y-1">
          <h1 className="font-serif-book font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-[#203746] leading-[1.08]">
            <span className="block">CÔ ẤY</span>
            <span className="block text-[#397D78]">ĐÃ BẮT ĐẦU</span>
            <span className="block">NHƯ THẾ</span>
          </h1>
        </div>

        <div className="w-16 h-1 bg-[#B66A50] rounded-full my-4" />

        <p className="font-serif-book italic text-lg sm:text-xl md:text-2xl text-[#203746]/85 font-medium">
          {BOOK_METADATA.subtitle}
        </p>

        {/* Selected Elegant STEM Line Art Symbolizing "The Beginning of a Question" */}
        <div className="pt-4 flex items-center gap-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-[#397D78]/30 flex items-center justify-center bg-[#FAF7F0] shadow-xs">
            <svg viewBox="0 0 48 48" className="w-9 h-9 sm:w-11 sm:h-11 text-[#397D78] stroke-current fill-none" strokeWidth="1.5">
              {/* Notebook page turning into an orbit */}
              <path d="M8 38V10C8 8.89543 8.89543 8 10 8H24V40H10C8.89543 40 8 39.1046 8 38Z" />
              <path d="M24 8H38C39.1046 8 40 8.89543 40 10V38C40 39.1046 39.1046 40 38 40H24V8Z" />
              <circle cx="24" cy="24" r="14" strokeDasharray="3 3" className="text-[#B66A50]" />
              <path d="M24 16V24L28 28" strokeLinecap="round" />
            </svg>
          </div>
          <p className="text-xs sm:text-sm font-serif-book text-[#203746]/70 max-w-xs leading-relaxed">
            Hành trình đến với khoa học và công nghệ qua 23 câu chuyện của giáo viên, nhà khoa học và người trẻ.
          </p>
        </div>
      </div>

      {/* Bottom info & Call to action */}
      <div className="relative z-10 pt-4 border-t border-[#397D78]/20 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="font-sans-ui text-xs font-bold text-[#203746] tracking-wide">
            {BOOK_METADATA.organization}
          </p>
          <p className="font-sans-ui text-[11px] text-[#203746]/60 mt-0.5">
            Dành cho học sinh THPT & nữ sinh các trường miền núi
          </p>
        </div>

        <button
          onClick={onOpenBook}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#397D78] hover:bg-[#2C625E] text-white font-sans-ui text-sm font-semibold shadow-md transition-all group cursor-pointer hover:shadow-lg active:scale-98"
        >
          <span>Mở sách để đọc</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
