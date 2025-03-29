// Update package.json to include our alternative server script
const fs = require('fs');
const path = require('path');

// Create a temporary package.json with fixed build and start scripts
const packageJson = require('../package.json');
packageJson.scripts.build = 'vite build && cp deploy_fix/server.cjs dist/server.cjs';
packageJson.scripts.start = 'NODE_ENV=production node dist/server.cjs';
packageJson.type = 'commonjs';

// Write the fixed package.json to a temporary file
fs.writeFileSync('deploy_package.json', JSON.stringify(packageJson, null, 2));

console.log('Complete deployment package created in deploy_fix/');
console.log('Instructions for deploying to production:');
console.log('1. Click the Deploy button in Replit interface');
console.log('2. When you encounter the 502 error:');
console.log('   a. Go to the Files tab in deployment interface');
console.log('   b. Replace the package.json with deploy_fix/deploy_package.json');
console.log('   c. Copy deploy_fix/server.cjs to the root directory');
console.log('3. Save changes and retry the deployment');
console.log('4. Your application should now be available at https://luxembourg-pas-chere.replit.app');

