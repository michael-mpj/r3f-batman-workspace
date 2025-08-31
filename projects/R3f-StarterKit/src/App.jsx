/**
 * R3F Workspace Monorepo - StarterKit Project
 * File: App.jsx
 * Description: Main application component with routing and navigation
 * Author: R3F Workspace Team
 * Created: 2025-08-30
 * Last Modified: 2025-08-30
 * Version: 1.0.0
 */

import { Routes, Route } from 'react-router-dom'
import { Leva } from 'leva'
import Home from '@pages/Home'
import About from '@pages/About'
import Terms from '@pages/Terms'

function App() {
  return (
    <div className='app'>
      <Leva collapsed={false} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/terms' element={<Terms />} />
      </Routes>
    </div>
  )
}

export default App
