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
    <div className={`flex flex-col ${sizeClass} rounded-lg py-4 px-6 ${className}`}>
      {/* Header/Title */}
      {(header || title) && (
        <div className="border-b pb-3 mb-3">
          <h3 className="text-center font-bold text-xl text-gray-800">
            {header || title}
          </h3>
        </div>
      )}

      {/* Body */}
      {body && (
        <div className="flex-1 overflow-y-auto">
          {typeof body === 'string' ? (
            <p className="text-sm text-gray-600">{body}</p>
          ) : (
            body
          )}
        </div>
      )}

      {/* Footer */}
      {footer && (
        <div className=" pt-3 mt-3">
          {typeof footer === 'string' ? (
            <p className="text-sm text-gray-500">{footer}</p>
          ) : (
            footer
          )}
        </div>
      )}
    </div>
  );
};

export default Card;
