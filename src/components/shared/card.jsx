import React from 'react';

const Card = ({ header, title, body, footer, size = 'full', className = '' }) => {
  // Size classes mapping
  const sizeClasses = {
    full: 'w-full h-full',
    sm: 'w-48 h-40',
    md: 'w-64 h-56',
    lg: 'w-96 h-80',
  };

  const sizeClass = sizeClasses[size] || sizeClasses.full;

  return (
    <div 
      className={`flex flex-col ${sizeClass} rounded-lg py-4 px-6 ${className}`}
      style={{
        backgroundColor: 'var(--color-card)',
        border: '1px solid var(--color-border)',
        color: 'var(--color-text)'
      }}
    >      {/* Header/Title */}
      {(header || title) && (
        <div className="border-b pb-3 mb-3" style={{ borderColor: 'var(--color-border)' }}>
          <h3 className="text-center font-bold text-xl" style={{ color: 'var(--color-primary)' }}>
            {header || title}
          </h3>
        </div>
      )}

      {/* Body */}
      {body && (
        <div className="flex-1 overflow-y-auto">
          {typeof body === 'string' ? (
            <p className="text-sm" style={{ color: 'var(--color-secondary)' }}>{body}</p>
          ) : (
            body
          )}
        </div>
      )}

      {/* Footer */}
      {footer && (
        <div className=" pt-3 mt-3">
          {typeof footer === 'string' ? (
            <p className="text-sm" style={{ color: 'var(--color-secondary)' }}>{footer}</p>
          ) : (
            footer
          )}
        </div>
      )}
    </div>
  );
};

export default Card;
