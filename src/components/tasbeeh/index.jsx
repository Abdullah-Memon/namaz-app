import React, { useState, useEffect } from 'react';
import { getTranslation } from '../../utils/enums';

const Tasbeeh = () => {
  // Initialize state from localStorage
  const getInitialState = () => {
    const savedData = localStorage.getItem('tasbeeh');
    if (savedData) {
      return JSON.parse(savedData);
    }
    return {
      count: 0,
      totalCount: 0,
      target: 33,
      history: []
    };
  };

  const initialState = getInitialState();
  const [count, setCount] = useState(initialState.count);
  const [totalCount, setTotalCount] = useState(initialState.totalCount);
  const [target, setTarget] = useState(initialState.target);
  const [history, setHistory] = useState(initialState.history);
  const [showHistory, setShowHistory] = useState(false);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    const data = {
      count,
      totalCount,
      target,
      history
    };
    localStorage.setItem('tasbeeh', JSON.stringify(data));
  }, [count, totalCount, target, history]);

  const handleIncrement = () => {
    const newCount = count + 1;
    const newTotalCount = totalCount + 1;
    setCount(newCount);
    setTotalCount(newTotalCount);

    // Check if target reached
    if (newCount >= target) {
      // Vibrate if supported
      if (navigator.vibrate) {
        navigator.vibrate([200, 100, 200]);
      }
      
      // Add to history
      const newHistoryItem = {
        date: new Date().toISOString(),
        count: target,
        target: target
      };
      setHistory([newHistoryItem, ...history.slice(0, 9)]); // Keep last 10 entries
    }
  };

  const handleReset = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setCount(0);
  };

  const handleResetAll = () => {
    if (window.confirm('Reset all counters and history?')) {
      setCount(0);
      setTotalCount(0);
      setHistory([]);
    }
  };

  const setQuickTarget = (value) => {
    setTarget(value);
    setCount(0);
  };

  const progress = (count / target) * 100;

  return (
    <div className="px-6 py-8 space-y-6" style={{ backgroundColor: 'var(--color-background)' }}>
      {/* Header */}
      <div className="text-center">
        <h1 
          className="text-3xl font-bold mb-2" 
          style={{ 
            color: 'var(--color-text)',
            fontFamily: 'var(--font-family-heading)'
          }}
        >
           {getTranslation("LabelTexts").tasbeehCounterTitle}
        </h1>
        <p className="text-sm" style={{ color: 'var(--color-secondary)' }}>
          {getTranslation("LabelTexts").tasbeehCounterDescription}
        </p>
      </div>

      {/* Main Counter Card - Circular & Clickable */}
      <div className="relative flex flex-col items-center gap-6">
        <button
          onClick={handleIncrement}
          className="w-[300px] h-[300px] rounded-full shadow-2xl relative overflow-hidden transition-all duration-200 active:scale-95"
          style={{
            background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))',
            border: '8px solid rgba(255, 255, 255, 0.3)'
          }}
        >
          {/* Progress Ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 400 400">
            <circle
              cx="200"
              cy="200"
              r="190"
              fill="none"
              stroke="rgba(255, 255, 255, 0.2)"
              strokeWidth="12"
            />
            <circle
              cx="200"
              cy="200"
              r="190"
              fill="none"
              stroke="white"
              strokeWidth="12"
              strokeDasharray={`${2 * Math.PI * 190}`}
              strokeDashoffset={`${2 * Math.PI * 190 * (1 - progress / 100)}`}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 0.3s ease' }}
            />
          </svg>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-4">
            {/* Count Display */}
            <div 
              className="text-[100px] leading-none font-bold text-white"
              style={{ fontFamily: 'var(--font-family-heading)' }}
            >
              {count}
            </div>
            <div className="text-white text-2xl font-semibold">
              of {target}
            </div>

            {/* Target Reached Message */}
            {count >= target && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/20 backdrop-blur-sm animate-pulse">
                <div className="text-center px-6">
                  <div className="text-white text-3xl font-bold mb-2">
                    ✨ Goal Reached! ✨
                  </div>
                  <div className="text-white text-lg font-semibold">
                    May Allah accept your dhikr
                  </div>
                </div>
              </div>
            )}
          </div>
        </button>

        {/* Small Reset Button Outside */}
        <button
          onClick={handleReset}
          className="px-6 py-3 rounded-full text-base font-bold transition-all duration-200 active:scale-95"
          style={{
            backgroundColor: 'var(--color-card-secondary)',
            color: 'var(--color-text)',
            border: '2px solid var(--color-border)'
          }}
        >
          {getTranslation("ButtonTexts").reset}
        </button>
      </div>

      {/* Quick Target Selection */}
      <div>
        <h3 
          className="text-2xl font-bold mb-6 uppercase tracking-wider text-center"
          style={{ color: 'var(--color-secondary)' }}
        >
          {getTranslation("LabelTexts").tasbeehQuickTargetsTitle}
        </h3>
        <div className="grid grid-cols-2 gap-4 mt-6">
          {[33, 99, 100, 1000].map((targetValue) => (
            <button
              key={targetValue}
              onClick={() => setQuickTarget(targetValue)}
              className="p-8 rounded-2xl font-bold text-3xl transition-all duration-200 active:scale-95"
              style={{
                backgroundColor: target === targetValue ? 'var(--color-primary)' : 'var(--color-card-secondary)',
                color: target === targetValue ? 'white' : 'var(--color-text)',
                border: target === targetValue ? '3px solid var(--color-primary)' : '3px solid var(--color-border)',
                minHeight: '100px'
              }}
            >
              {targetValue}
            </button>
          ))}
        </div>
      </div>

      {/* Stats - Larger & More Readable */}
      <div className="grid grid-cols-2 gap-4">
        <div 
          className="p-8 rounded-2xl text-center"
          style={{ backgroundColor: 'var(--color-card-secondary)', border: '2px solid var(--color-border)' }}
        >
          <div 
            className="text-5xl font-bold mb-3"
            style={{ color: 'var(--color-primary)' }}
          >
            {totalCount}
          </div>
          <div className="text-lg font-semibold" style={{ color: 'var(--color-secondary)' }}>
            Total Count
          </div>
        </div>
        <div 
          className="p-8 rounded-2xl text-center"
          style={{ backgroundColor: 'var(--color-card-secondary)', border: '2px solid var(--color-border)' }}
        >
          <div 
            className="text-5xl font-bold mb-3"
            style={{ color: 'var(--color-primary)' }}
          >
            {history.length}
          </div>
          <div className="text-lg font-semibold" style={{ color: 'var(--color-secondary)' }}>
            Completions
          </div>
        </div>
      </div>

      {/* History Section - Larger & More Readable */}
      {history.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 
              className="text-2xl font-bold uppercase tracking-wider"
              style={{ color: 'var(--color-secondary)' }}
            >
              Recent History
            </h3>
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="text-lg font-bold px-6 py-3 rounded-xl active:scale-95 transition-all duration-200"
              style={{ 
                color: 'var(--color-primary)',
                backgroundColor: 'var(--color-card-secondary)',
                border: '2px solid var(--color-border)'
              }}
            >
              {showHistory ? 'Hide' : 'Show'}
            </button>
          </div>
          
          {showHistory && (
            <div className="space-y-4">
              {history.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-6 rounded-2xl"
                  style={{ 
                    backgroundColor: 'var(--color-card-secondary)',
                    border: '2px solid var(--color-border)'
                  }}
                >
                  <div>
                    <div 
                      className="font-bold text-xl mb-1"
                      style={{ color: 'var(--color-text)' }}
                    >
                      {item.count} × Completed
                    </div>
                    <div className="text-base font-semibold" style={{ color: 'var(--color-secondary)' }}>
                      {new Date(item.date).toLocaleDateString()} at{' '}
                      {new Date(item.date).toLocaleTimeString()}
                    </div>
                  </div>
                  <div className="text-4xl">✅</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Tasbeeh;
