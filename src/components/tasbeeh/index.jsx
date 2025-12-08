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

  const handleReset = () => {
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
          📿 {getTranslation("TasbeehCounterTitle")}
        </h1>
        <p className="text-sm" style={{ color: 'var(--color-secondary)' }}>
          {getTranslation("TasbeehCounterDescription")}
        </p>
      </div>

      {/* Main Counter Card - Optimized for 40+ Users */}
      <div 
        className="rounded-3xl p-10 shadow-2xl relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))'
        }}
      >
        {/* Progress Ring Background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <div className="w-[400px] h-[400px] rounded-full border-8 border-white"></div>
        </div>

        <div className="relative z-10 text-center space-y-8">
          {/* Count Display - Extra Large */}
          <div>
            <div 
              className="text-[120px] leading-none font-bold text-white mb-4"
              style={{ fontFamily: 'var(--font-family-heading)' }}
            >
              {count}
            </div>
            <div className="text-white text-2xl font-semibold">
              of {target}
            </div>
          </div>

          {/* Progress Bar - Larger & More Visible */}
          <div className="w-full bg-white/20 rounded-full h-5 overflow-hidden">
            <div 
              className="h-full bg-white rounded-full transition-all duration-300"
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>

          {/* Target Reached Message - Larger Text */}
          {count >= target && (
            <div className="animate-pulse">
              <div className="text-white text-3xl font-bold mb-2">
                ✨ Goal Reached! ✨
              </div>
              <div className="text-white text-lg font-semibold">
                May Allah accept your dhikr
              </div>
            </div>
          )}

          {/* Increment Button - Much Larger (300px for better accessibility) */}
          <button
            onClick={handleIncrement}
            className="w-[300px] h-[300px] mx-auto rounded-full font-bold text-4xl transition-all duration-200 active:scale-95 shadow-2xl"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              color: 'var(--color-primary)',
              border: '6px solid rgba(255, 255, 255, 0.5)',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)'
            }}
          >
            <div className="flex flex-col items-center gap-3">
              <div className="text-7xl">👆</div>
              <div>TAP</div>
            </div>
          </button>

          {/* Reset Button - Larger & More Visible */}
          {/* <button
            onClick={handleReset}
            className="px-10 py-5 rounded-2xl text-xl font-bold transition-all duration-200 active:scale-95"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.25)',
              color: 'white',
              border: '2px solid rgba(255, 255, 255, 0.4)',
              minWidth: '200px'
            }}
          >
            🔄 Reset Counter
          </button> */}
        </div>
      </div>

      {/* Quick Target Selection */}
      <div>
        <h3 
          className="text-2xl font-bold mb-6 uppercase tracking-wider text-center"
          style={{ color: 'var(--color-secondary)' }}
        >
          {getTranslation("TasbeehQuickTargetsTitle")}
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
