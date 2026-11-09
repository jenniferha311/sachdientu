import React from 'react';
import { Compass, Sparkles } from 'lucide-react';
import { BOOK_METADATA } from '../data/bookContent';

export const TitlePage: React.FC = () => {
  return (
    <div className="w-full h-full min-h-[580px] flex flex-col justify-between p-8 sm:p-12 bg-[#F7F3EA] border-r border-[#E5DECE] text-[#203746]">
      {/* Top minimal header */}
      <div className="text-center pt-4">
        <span className="font-sans-ui text-xs tracking-widest uppercase text-[#397D78] font-semibold">
          TÀI LIỆU GIÁO DỤC TRẢI NGHIỆM STEM
        </span>
      </div>

      {/* Main Title Center */}
      <div className="text-center my-auto space-y-6 max-w-md mx-auto">
        <div className="space-y-3">
          <h1 className="font-serif-book font-black text-2xl sm:text-3xl md:text-4xl text-[#203746] tracking-tight">
            CÔ ẤY ĐÃ BẮT ĐẦU NHƯ THẾ
          </h1>
          <p className="font-serif-book italic text-base sm:text-lg text-[#397D78] font-medium">
            {BOOK_METADATA.subtitle}
          </p>
        </div>

        <div className="w-12 h-0.5 bg-[#B66A50] mx-auto" />

        {/* Decorative Compass Rose SVG */}
        <div className="w-14 h-14 mx-auto text-[#397D78]/40">
          <svg viewBox="0 0 100 100" className="w-full h-full stroke-current fill-none" strokeWidth="2">
            <circle cx="50" cy="50" r="45" strokeDasharray="2 3" />
            <polygon points="50,15 54,46 85,50 54,54 50,85 46,54 15,50 46,46" fill="currentColor" opacity="0.2" />
          </svg>
        </div>

        <div className="space-y-2 pt-4 text-xs font-serif-book text-[#203746]/75 leading-relaxed">
          <p>
            Biên soạn phục vụ hoạt động trải nghiệm khoa học, câu lạc bộ sáng tạo kỹ thuật và bồi dưỡng niềm tin cho học sinh trung học phổ thông.
          </p>
          <p className="italic text-[#203746]/60">
            Đặc biệt gửi tới các bạn nữ sinh vùng trung du và miền núi.
          </p>
        </div>
      </div>

      {/* Bottom Publishing & School Info */}
      <div className="text-center border-t border-[#E5DECE] pt-6 pb-2 space-y-1 font-sans-ui text-xs">
        <p className="font-bold text-[#203746]">
          {BOOK_METADATA.organization}
        </p>
        <p className="text-[#203746]/60 text-[11px]">
          Lưu hành nội bộ · Xuất bản kỹ thuật số năm {BOOK_METADATA.year}
        </p>
      </div>
    </div>
  );
};
