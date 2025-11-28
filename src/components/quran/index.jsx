import React, { useState, useEffect } from 'react';
import { useApi } from '../../hooks/useApi';
import Card from '../shared/card';
import Dropdown from '../shared/dropdown';

const Quran = ({ sessionValues }) => {
  const [selectedSurah, setSelectedSurah] = useState(1); // Default to Al-Fatiha
  const [verses, setVerses] = useState([]);
  const [surahInfo, setSurahInfo] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pagination, setPagination] = useState(null);

  // Fetch all chapters/surahs
  const { 
    data: chaptersData, 
    loading: chaptersLoading, 
    error: chaptersError 
  } = useApi('quranChapters');

  // Fetch selected surah info
  const { 
    data: surahInfoData, 
    loading: surahInfoLoading 
  } = useApi('quranChapterInfo', { chapterId: selectedSurah }, !!selectedSurah);

  // Fetch verses for selected surah with pagination
  const { 
    data: versesData, 
    loading: versesLoading, 
    error: versesError 
  } = useApi('quranVerse', { 
    chapterId: selectedSurah,
    page: currentPage
  }, !!selectedSurah);

  // Process chapters data for dropdown
  const surahOptions = React.useMemo(() => {
    if (!chaptersData?.chapters) return [];
    
    return chaptersData.chapters.map(chapter => ({
      value: chapter.id,
      label: `${chapter.id}. ${chapter.name_simple} (${chapter.name_arabic})`,
      verses_count: chapter.verses_count
    }));
  }, [chaptersData]);

  // Handle surah selection
  const handleSurahSelect = (option) => {
    setSelectedSurah(option.value);
    setVerses([]); // Clear previous verses
    setCurrentPage(1); // Reset to first page
    setPagination(null); // Clear pagination info
  };

  // Process surah info
  useEffect(() => {
    if (surahInfoData?.chapter_info) {
      setSurahInfo(surahInfoData.chapter_info);
    }
  }, [surahInfoData]);

  // Process verses data
  useEffect(() => {
    if (versesData?.verses) {
      console.log('Verses data received:', versesData); // Debug log
      setVerses(versesData.verses);
    }
    if (versesData?.pagination) {
      setPagination(versesData.pagination);
      setTotalPages(versesData.pagination.total_pages || 1);
    }
  }, [versesData]);

  // Pagination handlers
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Get current language for UI text
  const currentLang = sessionValues?.language || 'en';
  
  const uiText = {
    en: {
      title: 'Holy Quran',
      selectSurah: 'Select Surah',
      loading: 'Loading...',
      error: 'Error loading data',
      verses: 'verses',
      revelation: 'Revelation',
      makkah: 'Makkah',
      madinah: 'Madinah',
      previous: 'Previous',
      next: 'Next',
      page: 'Page',
      of: 'of',
      bismillah: 'In the name of Allah, the Beneficent, the Merciful'
    },
    ur: {
      title: 'قرآن کریم',
      selectSurah: 'سورہ منتخب کریں',
      loading: 'لوڈ ہو رہا ہے...',
      error: 'ڈیٹا لوڈ کرنے میں خرابی',
      verses: 'آیات',
      revelation: 'نزول',
      makkah: 'مکہ',
      madinah: 'مدینہ',
      previous: 'پچھلا',
      next: 'اگلا',
      page: 'صفحہ',
      of: 'کا',
      bismillah: 'بسم اللہ الرحمن الرحیم'
    },
    sd: {
      title: 'قرآن ڪريم',
      selectSurah: 'سورة چونڊيو',
      loading: 'لوڊ ٿي رهيو آهي...',
      error: 'ڊيٽا لوڊ ڪرڻ ۾ خرابي',
      verses: 'آيتون',
      revelation: 'نزول',
      makkah: 'مڪو',
      madinah: 'مدينو',
      previous: 'اڳوڻو',
      next: 'اڳيون',
      page: 'صفحو',
      of: 'جو',
      bismillah: 'بسم اللہ الرحمن الرحیم'
    }
  };

  const t = uiText[currentLang] || uiText.en;

  return (
    <div className="module p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <h2 className="text-3xl font-bold mb-6 text-center" style={{ fontFamily: 'var(--font-family-heading)' }}>
          {t.title}
        </h2>

        {/* Controls */}
        <div className="mb-6">
          {/* Surah Selection */}
          <div>
            <Dropdown
              options={surahOptions}
              preSelectOption={selectedSurah}
              onSelect={handleSurahSelect}
              placeholder={t.selectSurah}
              label={t.selectSurah}
              searchable={true}
              disabled={chaptersLoading}
            />
          </div>
        </div>

        {/* Error Display */}
        {(chaptersError || versesError) && (
          <div className="mb-6 p-4 bg-red-100 text-red-800 rounded-lg text-center">
            {t.error}: {chaptersError?.message || versesError?.message}
          </div>
        )}

        {/* Surah Info */}
        {surahInfo && (
          <Card
            title={surahOptions.find(s => s.value === selectedSurah)?.label}
            body={
              <div className="text-center space-y-2">
                <p className="text-sm text-gray-600">
                  {surahInfo.verses_count} {t.verses}
                </p>
                <p className="text-sm text-gray-600">
                  {t.revelation}: {surahInfo.revelation_place === 'makkah' ? t.makkah : t.madinah}
                </p>
                {surahInfo.short_text && (
                  <p className="text-sm text-gray-700 mt-3 italic">
                    {surahInfo.short_text}
                  </p>
                )}
              </div>
            }
            className="bg-white mb-6"
          />
        )}

        {/* Loading State */}
        {(chaptersLoading || versesLoading || surahInfoLoading) && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">{t.loading}</p>
          </div>
        )}

        {/* Verses Display - Quran Book Style */}
        {verses.length > 0 && (
          <Card
            body={
              <div className="p-6">
                {/* Surah Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: 'var(--font-family-heading)' }}>
                    {surahOptions.find(s => s.value === selectedSurah)?.label}
                  </h3>
                  
                  {/* Bismillah - Skip for Al-Fatiha and At-Tawbah */}
                  {selectedSurah !== 1 && selectedSurah !== 9 && (
                    <div className="text-center mb-6">
                      <p 
                        className="text-xl text-gray-700 leading-relaxed"
                        style={{ 
                          fontFamily: 'Arabic, serif',
                          lineHeight: '2'
                        }}
                      >
                        بِسْمِ اللهِ الرَّحْمَٰنِ الرَّحِيمِ
                      </p>
                    </div>
                  )}
                </div>

                {/* Verses in continuous flow like real Quran */}
                <div className="text-right leading-loose">
                  {verses.map((verse, index) => (
                    <span key={verse.id || index}>
                      <span 
                        className="text-xl text-gray-800 inline"
                        style={{ 
                          fontFamily: 'Arabic, serif',
                          lineHeight: '2.5',
                          fontSize: '28px'
                        }}
                      >
                        {verse.text_uthmani || verse.text_imlaei}
                      </span>
                      {/* Verse Number in Circle */}
                      <span 
                        className="inline-flex items-center justify-center w-8 h-8 rounded-full border-2 text-sm font-bold mx-2"
                        style={{ 
                          color: 'var(--color-primary)', 
                          borderColor: 'var(--color-primary)',
                          fontSize: '14px'
                        }}
                      >
                        {verse.verse_number || index + 1}
                      </span>
                      {' '}
                    </span>
                  ))}
                </div>

                {/* Page Info */}
                {pagination && (
                  <div className="text-center text-sm text-gray-500 mt-8 pt-6 border-t">
                    {t.page} {currentPage} {t.of} {totalPages}
                    {pagination.total_records && (
                      <span className="ml-2">({pagination.total_records} {t.verses} اجمالی)</span>
                    )}
                  </div>
                )}
              </div>
            }
            className="bg-white shadow-lg"
          />
        )}

        {/* Pagination Controls */}
        {pagination && totalPages > 1 && (
          <div className="flex justify-center items-center space-x-4 mt-8 py-6">
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {t.previous}
            </button>
            
            <div className="flex items-center space-x-2">
              {/* Page Numbers */}
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => goToPage(pageNum)}
                    className={`w-10 h-10 rounded-lg font-semibold transition-colors ${
                      currentPage === pageNum
                        ? 'bg-primary text-white'
                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                    style={{
                      backgroundColor: currentPage === pageNum ? 'var(--color-primary)' : undefined
                    }}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {t.next}
            </button>
          </div>
        )}

        {/* Empty State */}
        {!chaptersLoading && !versesLoading && verses.length === 0 && selectedSurah && (
          <div className="text-center py-8 text-gray-500">
            <p>No verses found for the selected surah.</p>
            {process.env.NODE_ENV === 'development' && (
              <div className="mt-4 text-xs text-left">
                <p>Debug Info:</p>
                <p>Selected Surah: {selectedSurah}</p>
                <p>Current Page: {currentPage}</p>
                <p>Verses Data: {JSON.stringify(versesData, null, 2)}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Quran;
