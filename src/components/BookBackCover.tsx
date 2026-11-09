import React from 'react';
import { BOOK_METADATA } from '../data/bookContent';
import { ArrowLeft, BookOpen, Compass, Award } from 'lucide-react';

interface BookBackCoverProps {
  onGoToFirstPage: () => void;
}

export const BookBackCover: React.FC<BookBackCoverProps> = ({ onGoToFirstPage }) => {
  return (
    <div className="w-full h-full min-h-[580px] sm:min-h-[640px] md:min-h-[700px] flex flex-col justify-between p-8 sm:p-12 md:p-14 bg-[#F7F3EA] border border-[#E0D8C6] shadow-xl relative overflow-hidden select-none">
      {/* Background paper texture & spine gradient */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-l from-black/5 via-transparent to-black/3" />
      <div className="absolute top-0 bottom-0 right-0 w-4 bg-gradient-to-l from-[#203746]/20 to-transparent pointer-events-none" />

      {/* Decorative compass seal watermark */}
      <div className="absolute -left-16 -top-16 w-72 h-72 opacity-5 pointer-events-none">
        <svg viewBox="0 0 200 200" className="w-full h-full text-[#397D78] stroke-current fill-none" strokeWidth="1">
          <circle cx="100" cy="100" r="90" />
          <circle cx="100" cy="100" r="60" strokeDasharray="3 3" />
          <circle cx="100" cy="100" r="30" />
        </svg>
      </div>

      {/* Top Header Tag */}
      <div className="relative z-10 flex items-center justify-between border-b border-[#397D78]/20 pb-4">
        <span className="font-sans-ui text-xs tracking-wider uppercase font-semibold text-[#397D78]">
          THÔNG ĐIỆP KẾT THÚC
        </span>
        <button
          onClick={onGoToFirstPage}
          className="text-xs font-sans-ui text-[#397D78] hover:text-[#203746] flex items-center gap-1 font-semibold cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Về trang bìa trước</span>
        </button>
      </div>

      {/* Center blurb card */}
      <div className="relative z-10 my-auto py-6 space-y-6 max-w-lg mx-auto text-center">
        <div className="space-y-2">
          <h3 className="font-serif-book font-bold text-xl sm:text-2xl text-[#203746]">
            {BOOK_METADATA.title}
          </h3>
          <p className="font-serif-book italic text-sm sm:text-base text-[#397D78]">
            {BOOK_METADATA.subtitle}
          </p>
        </div>

        <div className="w-16 h-0.5 bg-[#B66A50] mx-auto" />

        <blockquote className="font-serif-book text-sm sm:text-base text-[#203746]/85 italic leading-relaxed px-4">
          "Không ai bắt buộc các bạn phải trở thành nhà khoa học vĩ đại. Điều quan trọng nhất là các bạn dám tự tin đặt một câu hỏi, dám cầm dụng cụ lên để thử, và tin rằng trí tuệ của mình có thể chạm đến bất kỳ đỉnh cao nào."
        </blockquote>

        <div className="pt-4 space-y-2 text-xs font-serif-book text-[#203746]/70 leading-relaxed max-w-md mx-auto">
          <p>
            Cuốn sách này là sản phẩm giáo dục phi lợi nhuận do Câu lạc bộ STEM EMGIS tỉnh Phú Thọ biên soạn nhằm khích lệ niềm tin, xóa bỏ định kiến giới và tiếp lửa cho học sinh miền núi trên con đường học tập khoa học công nghệ.
          </p>
        </div>
      </div>

      {/* Bottom organization & ISBN-neutral information */}
      <div className="relative z-10 pt-6 border-t border-[#397D78]/20 flex flex-col sm:flex-row sm:items-end justify-between gap-4 font-sans-ui text-xs">
        <div className="space-y-1">
          <p className="font-bold text-[#203746] text-sm">
            {BOOK_METADATA.organization}
          </p>
          <p className="text-[#203746]/60">
            Dự án Thúc đẩy Bình đẳng Giới và Giáo dục STEM Miền núi
          </p>
        </div>

        {/* Thematic Book Identifier Box */}
        <div className="flex items-center gap-3 bg-[#FAF7F0] p-2.5 rounded-lg border border-[#E5DECE] shrink-0">
          <div className="w-8 h-8 rounded bg-[#397D78]/10 text-[#397D78] flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <div className="text-[11px] text-left">
            <p className="font-bold text-[#203746]">Ấn phẩm học đường</p>
            <p className="font-mono text-[#203746]/60">STEM-EMGIS-2026</p>
          </div>
        </div>
      </div>
    </div>
  );
};
