/**
 * R3F Workspace Monorepo - UI Package
 * File: Panel.jsx
 * Description: Panel component/utility
 * Author: R3F Workspace Team
 * Created: 2025-08-30
 * Last Modified: 2025-08-30
 * Version: 1.0.0
 */

import React from "react";

export const Panel = ({
  children,
  title,
  className = "",
  variant = "default",
  collapsible = false,
  defaultCollapsed = false,
  ...props
}) => {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);

  const baseStyles = "rounded-lg border backdrop-blur-sm";

  const variantStyles = {
    default: "bg-black/80 border-gray-700 text-white",
    glass: "bg-white/10 border-white/20 text-white",
    solid: "bg-gray-900 border-gray-700 text-white",
  };

  const variantClass = variantStyles[variant] || variantStyles.default;

  return (
    <div className={`${baseStyles} ${variantClass} ${className}`} {...props}>
      {title && (
        <div className='flex items-center justify-between p-4 border-b border-gray-700'>
          <h3 className='text-sm font-medium'>{title}</h3>
          {collapsible && (
            <button onClick={() => setIsCollapsed(!isCollapsed)} className='text-gray-400 hover:text-white transition-colors'>
              {isCollapsed ? "▼" : "▲"}
            </button>
          )}
        </div>
      )}
      {(!collapsible || !isCollapsed) && <div className='p-4'>{children}</div>}
    </div>
  );
};

export default Panel;
