/**
 * R3F Workspace Monorepo - StarterKit Project
 * File: Navigation.jsx
 * Description: Navigation component for the application
 * Author: R3F Workspace Team
 * Created: 2025-08-31
 * Last Modified: 2025-08-31
 * Version: 1.0.0
 */

import { Link, useLocation } from 'react-router-dom'
import './Navigation.css'

export default function Navigation() {
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/terms', label: 'Terms' },
  ]

  return (
    <nav className='navigation'>
      <div className='nav-brand'>
        <h2>🦇 R3F Batman</h2>
      </div>
      <ul className='nav-links'>
        {navItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={location.pathname === item.path ? 'active' : ''}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
