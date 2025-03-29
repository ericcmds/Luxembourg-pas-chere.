// CommonJS compatibility fix
const fs = require('fs');
const path = require('path');

// Create a temporary package.json with fixed build script
const packageJson = require('../package.json');
packageJson.scripts.build = 'vite build && esbuild server/index.ts --platform=node --packages=external --bundle --outdir=dist';
packageJson.type = 'commonjs';

// Write the fixed package.json to a temporary file
fs.writeFileSync('fixed_package.json', JSON.stringify(packageJson, null, 2));

// Print success message
console.log('Fixed package.json created in deploy_fix/fixed_package.json');
console.log('To use this for deployment: 1) Click deploy 2) When build fails, replace package.json with this file in the deployment interface 3) Rebuild');

