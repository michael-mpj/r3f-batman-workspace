/**
 * Cyber Forge - Loading Screen Component
 * File: LoadingScreen.jsx
 * Description: Cyberpunk-themed loading screen
 * Author: R3F Workspace Team
 * Created: 2025-08-31
 * Last Modified: 2025-08-31
 * Version: 1.0.0
 */

import { useState, useEffect } from "react";

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className='loading-screen'>
      <div className='loading-text'>CYBER FORGE</div>
    </div>
  );
}
