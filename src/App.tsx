import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useBookStorage } from './hooks/useBookStorage';
import { BookNavbar } from './components/BookNavbar';
import { TableOfContentsModal } from './components/TableOfContentsModal';
import { SearchModal } from './components/SearchModal';
import { HandoverReportModal } from './components/HandoverReportModal';
import { PrintWorksheetModal } from './components/PrintWorksheetModal';

import { BookCover } from './components/BookCover';
import { TitlePage } from './components/TitlePage';
import { ForewordPage } from './components/ForewordPage';
import { TableOfContentsPage } from './components/TableOfContentsPage';
import { PartDividerPage } from './components/PartDividerPage';
import { StoryPage } from './components/StoryPage';
import { EpiloguePage } from './components/EpiloguePage';
import { InteractiveActivitiesPage } from './components/InteractiveActivitiesPage';
import { BookBackCover } from './components/BookBackCover';

import { BOOK_PARTS, STORY_FIGURES, BOOK_METADATA } from './data/bookContent';
import { ChevronLeft, ChevronRight, BookOpen, Columns, AlignJustify } from 'lucide-react';

export default function App() {
  const {
    state,
    setPage,
    setReadingMode,
    setFontSize,
    toggleBookmark,
    saveReflection,
    saveFinalReflection,
    selectQuizAnswer,
    submitQuiz,
    resetQuiz,
    setSelectedChallenge,
    saveJournalField,
    saveActionReview,
    setRubricRating,
    setRubricTeacherNotes,
    clearAllData,
    exportLearnerMarkdown,
  } = useBookStorage();

  // Modals
  const [isTOCModalOpen, setIsTOCModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  const TOTAL_PAGES = 33;
  const currentPage = state.currentPage;

  // Navigation handlers
  const goToNextPage = useCallback(() => {
    if (currentPage >= TOTAL_PAGES - 1) return;
    if (state.readingMode === 'flip' && window.innerWidth >= 1024 && currentPage > 0) {
      // In 2-page spread, jump by 2 pages
      const nextP = currentPage % 2 === 1 ? currentPage + 2 : currentPage + 1;
      setPage(Math.min(TOTAL_PAGES - 1, nextP));
    } else {
      setPage(currentPage + 1);
    }
  }, [currentPage, TOTAL_PAGES, state.readingMode, setPage]);

  const goToPrevPage = useCallback(() => {
    if (currentPage <= 0) return;
    if (state.readingMode === 'flip' && window.innerWidth >= 1024 && currentPage > 2) {
      // In 2-page spread, jump backward by 2
      const prevP = currentPage % 2 === 1 ? currentPage - 2 : currentPage - 3;
      setPage(Math.max(0, prevP));
    } else if (currentPage === 1 || currentPage === 2) {
      setPage(0);
    } else {
      setPage(currentPage - 1);
    }
  }, [currentPage, state.readingMode, setPage]);

  // Keyboard navigation with input focus safeguard
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // If user is focused inside an input, textarea or contenteditable, ignore arrows
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return;
      }

      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        goToNextPage();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        goToPrevPage();
      } else if (e.key === 'Home') {
        setPage(0);
      } else if (e.key === 'End') {
        setPage(TOTAL_PAGES - 1);
      } else if (e.key === 'Escape') {
        setIsTOCModalOpen(false);
        setIsSearchModalOpen(false);
        setIsReportModalOpen(false);
        setIsPrintModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNextPage, goToPrevPage, setPage, TOTAL_PAGES]);

  // Helper to render any page content by index
  const renderPageByIndex = (index: number) => {
    if (index === 0) {
      return <BookCover onOpenBook={() => setPage(1)} />;
    }
    if (index === 1) {
      return <TitlePage />;
    }
    if (index === 2) {
      return <ForewordPage fontSize={state.fontSize} />;
    }
    if (index === 3) {
      return <TableOfContentsPage onNavigateToPage={setPage} pageNumber={4} />;
    }
    if (index === 4) {
      return <PartDividerPage part={BOOK_PARTS[0]} pageNumber={5} />;
    }
    if (index >= 5 && index <= 9) {
      const fig = STORY_FIGURES[index - 5];
      return (
        <StoryPage
          figure={fig}
          pageNumber={index + 1}
          fontSize={state.fontSize}
          savedReflection={state.reflections[fig.code]}
          onSaveReflection={saveReflection}
          isBookmarked={state.bookmarks.includes(index)}
          onToggleBookmark={() => toggleBookmark(index)}
        />
      );
    }
    if (index === 10) {
      return <PartDividerPage part={BOOK_PARTS[1]} pageNumber={11} />;
    }
    if (index >= 11 && index <= 14) {
      const fig = STORY_FIGURES[index - 11 + 5];
      return (
        <StoryPage
          figure={fig}
          pageNumber={index + 1}
          fontSize={state.fontSize}
          savedReflection={state.reflections[fig.code]}
          onSaveReflection={saveReflection}
          isBookmarked={state.bookmarks.includes(index)}
          onToggleBookmark={() => toggleBookmark(index)}
        />
      );
    }
    if (index === 15) {
      return <PartDividerPage part={BOOK_PARTS[2]} pageNumber={16} />;
    }
    if (index >= 16 && index <= 29) {
      const fig = STORY_FIGURES[index - 16 + 9];
      return (
        <StoryPage
          figure={fig}
          pageNumber={index + 1}
          fontSize={state.fontSize}
          savedReflection={state.reflections[fig.code]}
          onSaveReflection={saveReflection}
          isBookmarked={state.bookmarks.includes(index)}
          onToggleBookmark={() => toggleBookmark(index)}
        />
      );
    }
    if (index === 30) {
      return <EpiloguePage fontSize={state.fontSize} pageNumber={31} />;
    }
    if (index === 31) {
      return (
        <InteractiveActivitiesPage
          state={state}
          pageNumber={32}
          onSaveFinalReflection={saveFinalReflection}
          onSelectQuizAnswer={selectQuizAnswer}
          onSubmitQuiz={submitQuiz}
          onResetQuiz={resetQuiz}
          onSelectChallenge={setSelectedChallenge}
          onSaveJournalField={saveJournalField}
          onSaveActionReview={saveActionReview}
          onSetRubricRating={setRubricRating}
          onSetRubricTeacherNotes={setRubricTeacherNotes}
          onExportMarkdown={exportLearnerMarkdown}
          onOpenPrint={() => setIsPrintModalOpen(true)}
          onClearAll={clearAllData}
          onNavigateToFigure={(figureId) => {
            const fig = STORY_FIGURES.find((f) => f.id === figureId);
            if (fig) {
              const pIdx =
                fig.number <= 5
                  ? 4 + fig.number
                  : fig.number <= 9
                  ? 10 + (fig.number - 5)
                  : 15 + (fig.number - 9);
              setPage(pIdx);
            }
          }}
        />
      );
    }
    if (index === 32) {
      return <BookBackCover onGoToFirstPage={() => setPage(0)} />;
    }
    return null;
  };

  // Determine two-page spread indexes
  // If currentPage === 0 (Cover), show only Cover
  // If currentPage > 0, on desktop left page is odd index, right page is even index
  const isTwoPageSpread = state.readingMode === 'flip' && currentPage > 0 && currentPage < TOTAL_PAGES - 1;
  const leftPageIndex = isTwoPageSpread ? (currentPage % 2 === 1 ? currentPage : currentPage - 1) : currentPage;
  const rightPageIndex = isTwoPageSpread ? leftPageIndex + 1 : null;

  // Touch swipe support for mobile
  const touchStartXRef = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchStartXRef.current - touchEndX;
    if (deltaX > 60) {
      goToNextPage();
    } else if (deltaX < -60) {
      goToPrevPage();
    }
    touchStartXRef.current = null;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#EDE8DC] text-[#203746] select-text">
      {/* Navbar */}
      <BookNavbar
        currentPage={currentPage}
        totalPages={TOTAL_PAGES}
        readingMode={state.readingMode}
        fontSize={state.fontSize}
        isBookmarked={state.bookmarks.includes(currentPage)}
        onToggleBookmark={() => toggleBookmark(currentPage)}
        onSetReadingMode={setReadingMode}
        onSetFontSize={setFontSize}
        onOpenTOC={() => setIsTOCModalOpen(true)}
        onOpenSearch={() => setIsSearchModalOpen(true)}
        onOpenActivities={() => setPage(31)}
        onOpenReport={() => setIsReportModalOpen(true)}
        onOpenPrint={() => setIsPrintModalOpen(true)}
        onGoToCover={() => setPage(0)}
      />

      {/* Main Book Stage Area */}
      <main 
        className="flex-1 flex flex-col items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8 overflow-x-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {state.readingMode === 'continuous' ? (
          /* Continuous Scroll Reading Mode */
          <div className="w-full max-w-3xl space-y-8 py-4">
            {Array.from({ length: TOTAL_PAGES }).map((_, idx) => (
              <div
                key={idx}
                id={`page-${idx}`}
                className="bg-[#F7F3EA] rounded-xl shadow-md border border-[#E0D8C6] overflow-hidden"
              >
                {renderPageByIndex(idx)}
              </div>
            ))}
          </div>
        ) : (
          /* Flipbook Interactive Mode */
          <div className="w-full max-w-6xl flex flex-col items-center justify-center">
            {/* Book Spine and Spreads Container */}
            <div className="w-full flex items-center justify-center">
              {currentPage === 0 ? (
                /* Front Cover View (Single centered card with book depth) */
                <div className="w-full max-w-lg md:max-w-xl rounded-r-xl rounded-l-md overflow-hidden book-shadow border-y border-r border-[#D9D0BE] transition-transform duration-300">
                  {renderPageByIndex(0)}
                </div>
              ) : currentPage === TOTAL_PAGES - 1 ? (
                /* Back Cover View */
                <div className="w-full max-w-lg md:max-w-xl rounded-l-xl rounded-r-md overflow-hidden book-shadow border-y border-l border-[#D9D0BE] transition-transform duration-300">
                  {renderPageByIndex(TOTAL_PAGES - 1)}
                </div>
              ) : (
                /* Inside Book: Two-page spread on wide screens, single page on narrow */
                <div className="w-full grid grid-cols-1 lg:grid-cols-2 rounded-xl overflow-hidden book-shadow border border-[#D9D0BE] bg-[#F7F3EA] relative">
                  {/* Spine shadow in center for desktop */}
                  <div className="hidden lg:block absolute inset-y-0 left-1/2 -translate-x-1/2 w-8 pointer-events-none spine-shadow z-20" />

                  {/* Left Page */}
                  <div className="w-full h-full min-h-[580px] border-b lg:border-b-0 lg:border-r border-[#E5DECE] relative">
                    {renderPageByIndex(leftPageIndex)}
                  </div>

                  {/* Right Page (Only shown if 2-page spread enabled) */}
                  <div className="hidden lg:block w-full h-full min-h-[580px] relative">
                    {rightPageIndex !== null && rightPageIndex < TOTAL_PAGES
                      ? renderPageByIndex(rightPageIndex)
                      : <div className="h-full bg-[#FAF7F0] p-12 text-center text-xs text-[#203746]/50 flex items-center justify-center">Trang trắng</div>
                    }
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Book Controls Bar */}
            <div className="no-print mt-6 flex flex-wrap items-center justify-between gap-4 w-full max-w-4xl px-4 py-3 bg-[#FAF7F0]/90 backdrop-blur-md rounded-xl border border-[#E0D8C6] shadow-xs text-xs font-sans-ui text-[#203746]">
              {/* Previous page button */}
              <button
                onClick={goToPrevPage}
                disabled={currentPage <= 0}
                className="px-3.5 py-2 rounded-lg bg-white hover:bg-[#EAE3D2] border border-[#D9D0BE] disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5 font-semibold cursor-pointer transition-colors shadow-2xs"
              >
                <ChevronLeft className="w-4 h-4 text-[#397D78]" />
                <span className="hidden sm:inline">Trang trước</span>
              </button>

              {/* Quick Jump & Slider */}
              <div className="flex items-center gap-3">
                <span className="font-mono text-[#203746]/80 font-bold">
                  {currentPage === 0
                    ? 'Bìa trước'
                    : currentPage === TOTAL_PAGES - 1
                    ? 'Bìa sau'
                    : isTwoPageSpread
                    ? `Trang ${leftPageIndex + 1} - ${Math.min(TOTAL_PAGES, (rightPageIndex || leftPageIndex) + 1)}`
                    : `Trang ${currentPage + 1}`}
                </span>
                <input
                  type="range"
                  min={0}
                  max={TOTAL_PAGES - 1}
                  value={currentPage}
                  onChange={(e) => setPage(Number(e.target.value))}
                  className="w-24 sm:w-36 accent-[#397D78] cursor-pointer"
                  title="Kéo để lật nhanh đến trang"
                />
                <span className="font-mono text-[#203746]/50 text-[11px]">
                  /{TOTAL_PAGES}
                </span>
              </div>

              {/* Next page button */}
              <button
                onClick={goToNextPage}
                disabled={currentPage >= TOTAL_PAGES - 1}
                className="px-3.5 py-2 rounded-lg bg-[#397D78] hover:bg-[#2C625E] text-white disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5 font-semibold cursor-pointer transition-colors shadow-2xs"
              >
                <span className="hidden sm:inline">Trang sau</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer minimal info */}
      <footer className="no-print py-3 border-t border-[#E5DECE] bg-[#FAF7F0] text-center text-xs font-sans-ui text-[#203746]/60">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>{BOOK_METADATA.title} · {BOOK_METADATA.subtitle}</span>
          <span className="text-[11px]">{BOOK_METADATA.organization}</span>
        </div>
      </footer>

      {/* Modals */}
      <TableOfContentsModal
        isOpen={isTOCModalOpen}
        onClose={() => setIsTOCModalOpen(false)}
        currentPage={currentPage}
        bookmarks={state.bookmarks}
        onNavigateToPage={setPage}
      />

      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onNavigateToPage={setPage}
      />

      <HandoverReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
      />

      <PrintWorksheetModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        state={state}
      />
    </div>
  );
}
