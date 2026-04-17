module.exports = {
  presets: ['module:@react-native/babel-preset'],
  // Required for dependencies (e.g., zod v4) that use `export * as ...` syntax.
  plugins: ['@babel/plugin-transform-export-namespace-from'],
};
