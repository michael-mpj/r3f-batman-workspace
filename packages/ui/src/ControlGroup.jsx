/**
 * R3F Workspace Monorepo - UI Package
 * File: ControlGroup.jsx
 * Description: Container component for grouping form controls and buttons
 * Author: R3F Workspace Team
 * Created: 2025-08-30
 * Last Modified: 2025-08-30
 * Version: 1.0.0
 */

import React from "react";

export const ControlGroup = ({ label, children, className = "" }) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && <label className='block text-xs font-medium text-gray-400 uppercase tracking-wide'>{label}</label>}
      <div className='space-y-1'>{children}</div>
    </div>
  );
};
