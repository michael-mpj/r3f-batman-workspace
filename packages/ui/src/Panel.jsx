/**
 * R3F Workspace Monorepo - UI Package
 * File: Panel.jsx
 * Description: Flexible panel component for layout and content organization
 * Author: R3F Workspace Team
 * Created: 2025-08-30
 * Last Modified: 2025-08-30
 * Version: 1.0.0
 */

import React from "react";

export const Panel = ({ title, children, position = "top-left", className = "" }) => {
  const positionStyles = {
    "top-left": "top-4 left-4",
    "top-right": "top-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "bottom-right": "bottom-4 right-4",
  };

  return (
    <div
      className={`absolute ${positionStyles[position]} bg-black/80 backdrop-blur-sm border border-gray-700 rounded-lg p-4 text-white min-w-[200px] ${className}`}
    >
      {title && <h3 className='text-sm font-semibold mb-3 text-gray-200'>{title}</h3>}
      {children}
    </div>
  );
};
