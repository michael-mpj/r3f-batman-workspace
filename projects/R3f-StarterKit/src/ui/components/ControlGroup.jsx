/**
 * R3F Workspace Monorepo - UI Package
 * File: ControlGroup.jsx
 * Description: ControlGroup component/utility
 * Author: R3F Workspace Team
 * Created: 2025-08-30
 * Last Modified: 2025-08-30
 * Version: 1.0.0
 */

import React from "react";

export const ControlGroup = ({ children, label, orientation = "vertical", className = "", ...props }) => {
  const orientationStyles = {
    vertical: "flex flex-col gap-2",
    horizontal: "flex flex-row gap-2 items-center",
  };

  const orientationClass = orientationStyles[orientation] || orientationStyles.vertical;

  return (
    <div className={`control-group ${className}`} {...props}>
      {label && <label className='text-xs font-medium text-gray-300 mb-1'>{label}</label>}
      <div className={orientationClass}>{children}</div>
    </div>
  );
};

export const Slider = ({ value, onChange, min = 0, max = 100, step = 1, label, showValue = true, className = "", ...props }) => {
  return (
    <div className={`slider-control ${className}`}>
      {label && (
        <div className='flex justify-between items-center mb-1'>
          <label className='text-xs text-gray-300'>{label}</label>
          {showValue && <span className='text-xs text-gray-400'>{value}</span>}
        </div>
      )}
      <input
        type='range'
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange?.(parseFloat(e.target.value))}
        className='w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider'
        {...props}
      />
    </div>
  );
};

export const Toggle = ({ checked, onChange, label, className = "", ...props }) => {
  return (
    <label className={`flex items-center gap-2 cursor-pointer ${className}`}>
      <input type='checkbox' checked={checked} onChange={e => onChange?.(e.target.checked)} className='sr-only' {...props} />
      <div
        className={`
        w-5 h-5 rounded border-2 transition-colors
        ${checked ? "bg-blue-600 border-blue-600" : "bg-transparent border-gray-600"}
        flex items-center justify-center
      `}
      >
        {checked && (
          <svg className='w-3 h-3 text-white' fill='currentColor' viewBox='0 0 20 20'>
            <path
              fillRule='evenodd'
              d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
              clipRule='evenodd'
            />
          </svg>
        )}
      </div>
      {label && <span className='text-sm text-gray-300'>{label}</span>}
    </label>
  );
};

export default ControlGroup;
