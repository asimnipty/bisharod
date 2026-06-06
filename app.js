// cPanel Node.js App entry point
// This tells cPanel where to start the app



process.chdir(__dirname);
require('./backend/dist/index.js');
