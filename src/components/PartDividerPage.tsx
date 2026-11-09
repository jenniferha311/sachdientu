import React from 'react';
import { BookPart } from '../types/book';
import { Sparkles, Compass, Lightbulb, Microscope } from 'lucide-react';

interface PartDividerPageProps {
  part: BookPart;
  pageNumber: number;
}

export const PartDividerPage: React.FC<PartDividerPageProps> = ({ part, pageNumber }) => {
  const getPartIcon = () => {
    switch (part.id) {
      case 1:
        return <Lightbulb className="w-10 h-10 text-[#397D78]" />;
      case 2:
        return <Compass className="w-10 h-10 text-[#B66A50]" />;
      case 3:
      default:
        return <Microscope className="w-10 h-10 text-[#397D78]" />;
    }
  };

  return (
    <div className="w-full h-full min-h-[580px] p-8 sm:p-14 md:p-16 bg-[#F7F3EA] text-[#203746] flex flex-col justify-between relative overflow-hidden select-none">
      {/* Background graphic elements */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 w-80 h-80 opacity-5 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full stroke-current fill-none" strokeWidth="1">
          <circle cx="50" cy="50" r="45" />
          <circle cx="50" cy="50" r="35" strokeDasharray="3 3" />
          <circle cx="50" cy="50" r="25" />
          <path d="M50 5 L50 95 M5 50 L95 50" />
        </svg>
      </div>

      {/* Top Part indicator */}
      <div className="border-b border-[#E5DECE] pb-3">
        <span className="font-sans-ui text-xs tracking-widest uppercase font-bold text-[#397D78]">
          PHẦN {part.roman}
        </span>
      </div>

      {/* Center content */}
      <div className="my-auto space-y-6 max-w-lg">
        <div className="w-16 h-16 rounded-xl bg-[#FAF7F0] border border-[#E5DECE] flex items-center justify-center shadow-xs">
          {getPartIcon()}
        </div>

        <div className="space-y-2">
          <h2 className="font-serif-book font-black text-3xl sm:text-4xl text-[#203746] tracking-tight leading-tight">
            {part.title}
          </h2>
          <p className="font-serif-book italic text-lg sm:text-xl text-[#397D78] font-medium">
            {part.subtitle}
          </p>
        </div>

        <div className="w-16 h-0.5 bg-[#B66A50]" />

        <blockquote className="font-serif-book text-sm sm:text-base text-[#203746]/80 italic pl-4 border-l-2 border-[#397D78]/40 leading-relaxed">
          "{part.leadQuote}"
        </blockquote>

        <p className="text-xs sm:text-sm font-serif-book text-[#203746]/70 leading-relaxed">
          {part.description}
        </p>
      </div>

      {/* Bottom Page Number */}
      <div className="pt-4 border-t border-[#E5DECE] flex justify-between items-center text-xs font-mono text-[#203746]/50">
        <span className="font-sans-ui">CÔ ẤY ĐÃ BẮT ĐẦU NHƯ THẾ</span>
        <span>Trang {pageNumber}</span>
      </div>
    </div>
  );
};
