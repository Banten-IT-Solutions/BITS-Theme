// prepare.js — dipanggil semantic-release pada fase "prepare".
// Menyelaraskan versi (package.json + lockfile + control), lalu build .ipk + .apk.
const fs = require('fs');
const { execSync } = require('child_process');

const version = process.argv[2];

if (!version) {
  console.error('usage: node scripts/prepare.js <version>');
  process.exit(1);
}

// 1) bump package.json + package-lock.json (npm version sinkron keduanya)
execSync(`npm version --no-git-tag-version ${version}`, { stdio: 'inherit' });

// 2) bump control (ipk + apk membaca Version dari control)
const name = 'luci-theme-bits';
let control = fs.readFileSync(`${name}/control`, 'utf8');
control = control.replace(/^Version: .*$/m, `Version: ${version}`);
fs.writeFileSync(`${name}/control`, control);

// 3) build .ipk + .apk (build.sh membaca metadata dari control)
execSync('bash build.sh', { stdio: 'inherit' });

console.log(`prepared version ${version}`);