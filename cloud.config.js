const { defineConfig } = require('iwc-cli');

module.exports = defineConfig({
  port: 999,

  title: 'typescript app',

  antdLessModifyVars: {
    'primary-color': '#1767f5',
  },

  cloudXyScssModifyVars: {
    'xy-primary-color': '#1767f5',
  },

  proxy: {
    '/server': {
      target: 'https://dev.xinhuaapp.com/',
      changeOrigin: true,
    },
  },

  publicPath: '.',

  mock: true,
});
