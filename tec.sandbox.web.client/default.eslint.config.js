import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';


export default [
  {files: ['*.ts', '*.js'],
    extends: [
      'plugin:@typescript-eslint/recommended',
      'plugin:angular/johnpapa',
      'airbnb-base'
    ],
    rules: {
      'no-console': ['error', { allow: ['warn', 'error'] }], // Prohibir console.log, permitir console.warn y console.error
      'semi': ['error', 'always'], // Enforce semicolons
      'quotes': ['error', 'single'], // Enforce single quotes
      'angular/no-service-method': 'off', // Example Angular-specific rule
      '@typescript-eslint/explicit-function-return-type': 'off', // Example TypeScript-specific rule
    },
  },
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
 
  ...tseslint.configs.recommended,
];