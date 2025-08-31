/**
 * R3F Workspace Monorepo - StarterKit Project
 * File: Grid.jsx
 * Description: Grid component/utility
 * Author: R3F Workspace Team
 * Created: 2025-08-30
 * Last Modified: 2025-08-30
 * Version: 1.0.0
 */

import { useControls } from 'leva'

export default function Grid() {
  const { size, divisions, color1, color2 } = useControls('Grid', {
    size: { value: 10, min: 1, max: 50, step: 1 },
    divisions: { value: 10, min: 1, max: 50, step: 1 },
    color1: '#444444',
    color2: '#888888',
  })

  return (
    <gridHelper
      args={[size, divisions, color1, color2]}
      position={[0, -1.5, 0]}
    />
  )
}
