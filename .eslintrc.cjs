module.exports = {
  root: true, // Prevent ESLint from looking further up the directory tree
  env: {
    browser: true, // Enables browser globals like `window` and `document`
    es2021: true, // Enables ES2021 globals and syntax
    node: true, // Enables Node.js global variables and Node.js scoping.
    'vue/setup-compiler-macros': true, // Define Vue 3 setup compiler macros like defineProps
  },
  parser: 'vue-eslint-parser', // Specifies the parser for `.vue` files
  parserOptions: {
    parser: '@typescript-eslint/parser', // Specifies the parser for `<script>` blocks
    ecmaVersion: 'latest', // Use the latest ECMAScript standard
    sourceType: 'module', // Allows using import/export statements
  },
  plugins: [
    'vue', // Enables eslint-plugin-vue
    '@typescript-eslint', // Enables @typescript-eslint/eslint-plugin
    'prettier', // Enables eslint-plugin-prettier
  ],
  extends: [
    'eslint:recommended', // Basic ESLint recommended rules
    'plugin:vue/vue3-recommended', // Vue 3 recommended rules (stronger than essential)
    'plugin:@typescript-eslint/recommended', // Recommended rules from @typescript-eslint/eslint-plugin
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. THIS MUST BE LAST in the extends array to override other configs!
  ],
  rules: {
    // Optional: Add custom rule overrides here
    // e.g., 'vue/multi-word-component-names': 'off', // Disable if you don't want to enforce multi-word component names
    // 'prettier/prettier': 'warn', // Report Prettier differences as warnings instead of errors
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // Warn about unused vars, allowing underscores
    '@typescript-eslint/no-explicit-any': 'warn', // Warn about using 'any' type
    // Add any other project-specific rules
  },
  ignorePatterns: [
    'node_modules/',
    'dist/',
    '*.d.ts', // Ignore TypeScript definition files
    '*.lock', // Ignore lock files
    '.eslintrc.cjs', // Ignore the ESLint config file itself
    'vite.config.ts', // Often good to ignore build config
    'src/mocks/**', // Example: Ignore mock files if desired
    // Add other patterns to ignore
  ],
}
