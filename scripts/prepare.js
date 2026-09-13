// prepare.js — dipanggil semantic-release pada fase "prepare".
// Menyelaraskan versi (package.json + lockfile + control), lalu build .ipk + .apk.
const fs = require('fs');
const { execSync } = require('child_process');

const version = process.argv[2];

if (!version) {
  console.error('usage: node scripts/prepare.js <version>');
  process.exit(1);
}

// 1) bump package.json + package-lock.json (manual, toleran same-version)
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
pkg.version = version;
fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n');

if (fs.existsSync('package-lock.json')) {
  const lock = JSON.parse(fs.readFileSync('package-lock.json', 'utf8'));
  lock.version = version;
  if (lock.packages && lock.packages['']) {
    lock.packages[''].version = version;
  }
  fs.writeFileSync('package-lock.json', JSON.stringify(lock, null, 2) + '\n');
}

// 2) bump control (ipk + apk membaca Version dari control)
const name = 'luci-theme-bits';
let control = fs.readFileSync(`${name}/control`, 'utf8');
control = control.replace(/^Version: .*$/m, `Version: ${version}`);
fs.writeFileSync(`${name}/control`, control);

// 3) build .ipk + .apk (build.sh membaca metadata dari control)
execSync('bash build.sh', { stdio: 'inherit' });

console.log(`prepared version ${version}`);