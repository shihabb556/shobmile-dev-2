import React from 'react';

const TooltipButton = ({ label, tooltip, buttonClassName, tooltipClassName }) => {
  return (
    <div className="relative group inline-block">
      <button className={`bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 transition duration-200 ease-in-out focus:outline-none ${buttonClassName}`}>
        {label}
      </button>
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max hidden group-hover:block">
        <span className={`bg-gray-700 text-white text-xs rounded py-1 px-2 shadow-lg ${tooltipClassName}`}>
          {tooltip}
        </span>
        <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-1 w-0 h-0 border-l-4 border-r-4 border-transparent border-t-4 border-gray-700"></div>
      </div>
    </div>
  );
};

export default TooltipButton;
