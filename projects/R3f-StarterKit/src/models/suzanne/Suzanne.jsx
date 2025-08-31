/**
 * R3F Workspace Monorepo - StarterKit Project
 * File: Suzanne.jsx
 * Description: Suzanne component/utility
 * Author: R3F Workspace Team
 * Created: 2025-08-31
 * Last Modified: 2025-08-31
 * Version: 1.0.0
 */

import React, { useMemo, useContext, createContext } from 'react'
import { useGLTF, Merged } from '@react-three/drei'

const context = createContext()
export function Instances({ children, ...props }) {
  const { nodes } = useGLTF('/suzanne.gltf')
  const instances = useMemo(
    () => ({
      Suzanne: nodes.Suzanne,
    }),
    [nodes]
  )
  return (
    <Merged meshes={instances} {...props}>
      {(instances) => (
        <context.Provider value={instances}>{children}</context.Provider>
      )}
    </Merged>
  )
}

export function Model(props) {
  const instances = useContext(context)
  return (
    <group {...props}>
      <group name='Scene'>
        <instances.Suzanne name='Suzanne' position={[0, 0.189, -0.043]} />
        <group
          name='Light'
          position={[4.076, 5.904, -1.005]}
          rotation={[1.89, 0.881, -2.045]}
        />
        <group
          name='Camera'
          position={[7.359, 4.958, 6.926]}
          rotation={[1.242, 0.33, -0.76]}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/suzanne.gltf')
