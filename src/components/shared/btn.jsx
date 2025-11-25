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
      className="cursor-pointer text-sm group relative flex gap-1.5 px-8 py-2 bg-primary bg-opacity-80 text-white rounded-2xl hover:bg-opacity-70 transition font-semibold shadow-md"
    >
      {iconStart}
      {title}
      {iconEnd}
      {tooltip && (
        <div className="absolute opacity-0 -bottom-full rounded-md py-2 px-2 bg-primary bg-opacity-70 left-1/2 -translate-x-1/2 group-hover:opacity-100 transition-opacity shadow-lg">
          {tooltip}
        </div>
      )}
    </button>
  );
};

export default Button;
