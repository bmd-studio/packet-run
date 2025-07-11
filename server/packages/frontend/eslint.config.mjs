import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat({
    // import.meta.dirname is available after Node.js v20.11.0
    baseDirectory: import.meta.dirname,
})

const eslintConfig = [
    ...compat.config({
        extends: ['next/core-web-vitals', 'next/typescript'],
        rules: {
            'indent': ['error', 4, { SwitchCase: 1 }],
            '@typescript-eslint/no-unused-vars': 'error',
            '@next/next/no-img-element': 'off',
            'jsx-a11y/alt-text': 'off',
        }
    }),
]

export default eslintConfig