/**
 * R3F Workspace Monorepo - UI Package
 * File: useTheme.js
 * Description: Theme management hook
 * Author: R3F Workspace Team
 * Created: 2025-08-31
 * Last Modified: 2025-08-31
 * Version: 1.0.0
 */

import { useState, useEffect } from 'react';

export function useTheme(defaultTheme = 'light') {
    const [theme, setTheme] = useState(defaultTheme);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(current => current === 'light' ? 'dark' : 'light');
    };

    return { theme, setTheme, toggleTheme };
}
