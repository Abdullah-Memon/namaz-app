import React from "react";

const Button = ({
  onClick,
  iconStart,
  iconEnd,
  title,
  tooltip,
  disabled = false
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="cursor-pointer text-sm group relative flex items-center gap-1.5 px-6 py-2 rounded-2xl transition font-semibold shadow-md"
      style={{
        backgroundColor: 'var(--color-button-bg)',
        color: 'var(--color-button-text)',
        opacity: disabled ? 0.5 : 0.9
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.target.style.opacity = '0.8';
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.target.style.opacity = '0.9';
        }
      }}
    >
      {iconStart}
      {title}
      {iconEnd}
      {tooltip && (
        <div 
          className="absolute opacity-0 -bottom-full rounded-md py-2 px-2 left-1/2 -translate-x-1/2 group-hover:opacity-100 transition-opacity shadow-lg text-xs whitespace-nowrap"
          style={{
            backgroundColor: 'var(--color-card)',
            color: 'var(--color-text)',
            border: '1px solid var(--color-border)'
          }}
        >
          {tooltip}
        </div>
      )}
    </button>
  );
};

export default Button;
