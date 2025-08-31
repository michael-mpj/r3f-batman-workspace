/**
 * R3F Workspace Monorepo - StarterKit Project
 * File: eslint.config.js
 * Description: Configuration settings for eslint.config
 * Author: R3F Workspace Team
 * Created: 2025-08-30
 * Last Modified: 2025-08-30
 * Version: 1.0.0
 */

import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import react from 'eslint-plugin-react'

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx,mjs}'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        __dirname: 'readonly',
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/no-unknown-property': [
        'error',
        {
          ignore: [
            // React Three Fiber properties
            'args',
            'position',
            'rotation',
            'scale',
            'castShadow',
            'receiveShadow',
            'intensity',
            'wireframe',
            'roughness',
            'metalness',
            'shadow-mapSize',
            'shadow-camera-far',
            'shadow-camera-left',
            'shadow-camera-right',
            'shadow-camera-top',
            'shadow-camera-bottom',
          ],
        },
      ],
      'no-unused-vars': 'warn',
    },
  },
]
