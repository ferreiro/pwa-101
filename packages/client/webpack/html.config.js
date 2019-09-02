/* eslint-env node */
module.exports = {
  title: 'Pennapps',
  template: '../server/views/index.ejs',
  apiEndpoint: process.env.API_ENDPOINT || 'https://localhost:3100'
};