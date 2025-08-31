/**
 * R3F Workspace Monorepo - StarterKit Project
 * File: Navigation.jsx
 * Description: Main navigation component with routing links
 * Author: R3F Workspace Team
 * Created: 2025-08-30
 * Last Modified: 2025-08-30
 * Version: 1.0.0
 */

import { NavLink } from 'react-router-dom'
import { Button, ControlGroup } from '@r3f-workspace/ui'

const navigationLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/terms', label: 'Terms' },
]

export default function Navigation() {
  return (
    <nav className='navigation'>
      <ControlGroup>
        {navigationLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <Button>{link.label}</Button>
          </NavLink>
        ))}
      </ControlGroup>
    </nav>
  )
}
