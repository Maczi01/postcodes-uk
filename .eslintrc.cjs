module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  ignorePatterns: ['!**/*'],
  plugins: [
    'ordered-imports',
    'prettier',
    'react-hooks'
  ],
  overrides: [
    {
      files: ['src/**/*.ts', 'src/**/*.tsx'], // Apply these rules only to TypeScript files in the src directory
      extends: [
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended'
      ],
      rules: {
        'no-use-before-define': 'warn',
        "import/no-unresolved": "off",
        '@typescript-eslint/no-use-before-define': ['error'],
        'no-shadow': 'warn',
        '@typescript-eslint/no-shadow': ['warn'],
        '@typescript-eslint/explicit-function-return-type': ['off'],
        'max-len': ['warn', { code: 100 }],
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': ['warn'],
        'import/prefer-default-export': 'off',
        'react/prop-types': 'warn',
        '@typescript-eslint/semi': ['warn'],
        '@typescript-eslint/space-before-function-paren': [0],
        '@typescript-eslint/triple-slash-reference': ['warn'],
        '@typescript-eslint/comma-dangle': ['off'],
        'react/react-in-jsx-scope': 'off',
        '@typescript-eslint/consistent-type-definitions': ['off'],
        '@typescript-eslint/member-delimiter-style': ['warn'],
        '@typescript-eslint/prefer-ts-expect-error': ['warn'],
        'no-console': ['warn'],
        '@typescript-eslint/indent': ['warn', 4],
        'react/jsx-indent': ['warn', 4],
        'react/jsx-indent-props': ['warn', 4],
        'react/jsx-max-props-per-line': ['warn', { maximum: 1, when: 'multiline' }],
        'react/jsx-first-prop-new-line': ['warn', 'multiline'],
        'react/jsx-closing-bracket-location': ['warn', 'line-aligned'],
        'react/jsx-closing-tag-location': ['warn'],
        '@typescript-eslint/no-empty-function': ['warn'],
        '@typescript-eslint/no-dynamic-delete': ['warn'],
        'multiline-ternary': ['off'],
        'ordered-imports/ordered-imports': [
          'error',
          {
            'group-ordering': [
              { 'name': 'relative dir', 'match': '^[.].*', 'order': 2 },
              { 'name': 'node_modules', 'match': '.*', 'order': 1 }
            ]
          }
        ],
        'prettier/prettier': ['warn', {}, { 'usePrettierrc': true }]
      }
    },
    {
      files: ['src/**/*.js', 'src/**/*.jsx'], // Apply these rules to JavaScript files in the src directory
      extends: [
        'plugin:react/recommended',
      ],
      rules: {
        // Additional JS-specific rules can be added here if needed
      }
    }
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended'
  ],
  settings: {
    react: {
      version: 'detect'
    }
  },
};
