/**
 * @type {import('@lzwme/fed-lint-helper').FlhConfig}
 */
module.exports = {
  src: ['src'],
  debug: false,
  silent: false,
  printDetail: true,
  exitOnError: true,
  cache: true,
  tscheck: {
    whiteListFilePath: 'scripts/config/tsCheckWhiteList.json',
  },
  eslint: {
    whiteListFilePath: 'scripts/config/eslintWhitelist.json',
  },
  jest: {
    // silent: true,
    // fileList: glob.sync('src/**/**.spec.ts'),
  },
};
