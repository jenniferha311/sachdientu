import React from 'react';
import { FOREWORD_TEXT } from '../data/bookContent';

interface ForewordPageProps {
  fontSize: number;
}

export const ForewordPage: React.FC<ForewordPageProps> = ({ fontSize }) => {
  const [firstPara, ...restParas] = FOREWORD_TEXT.paragraphs;
  const firstLetter = firstPara.charAt(0);
  const remainingFirstPara = firstPara.slice(1);

  return (
    <div className="w-full h-full min-h-[580px] p-8 sm:p-12 md:p-14 bg-[#F7F3EA] text-[#203746] flex flex-col justify-between">
      <div>
        {/* Chapter Header */}
        <div className="border-b border-[#E5DECE] pb-3 mb-6">
          <span className="font-sans-ui text-xs uppercase tracking-widest text-[#397D78] font-bold">
            MỞ ĐẦU
          </span>
          <h2 className="font-serif-book font-bold text-2xl sm:text-3xl text-[#203746] mt-1">
            {FOREWORD_TEXT.title}
          </h2>
          <p className="font-serif-book italic text-sm text-[#397D78] mt-1">
            {FOREWORD_TEXT.lead}
          </p>
        </div>

        {/* Text with Drop Cap */}
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

          {restParas.map((p, idx) => (
            <p key={idx} className="indent-6">
              {p}
            </p>
          ))}
        </div>
      </div>

      {/* Signature line */}
      <div className="pt-6 border-t border-[#E5DECE] mt-8 flex justify-between items-end text-xs font-sans-ui text-[#203746]/70">
        <div>
          <p className="font-bold text-[#203746]">Ban Biên Soạn Chuyên Đề</p>
          <p>Câu lạc bộ STEM EMGIS · Tỉnh Phú Thọ</p>
        </div>
        <span className="font-mono text-[#203746]/50">Trang 3</span>
      </div>
    </div>
  );
};
