// prepare.js — dipanggil semantic-release pada fase "prepare".
// Menyelaraskan versi package.json + control + Makefile, lalu membangun .ipk.
const fs = require('fs');
const { execSync } = require('child_process');

const version = process.argv[2];

if (!version) {
  console.error('usage: node scripts/prepare.js <version>');
  process.exit(1);
}

// package.json
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
pkg.version = version;
fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n');

// control (opkg)
const name = 'luci-theme-bits';
let control = fs.readFileSync(`${name}/control`, 'utf8');
control = control.replace(/^Version: .*$/m, `Version: ${version}`);
fs.writeFileSync(`${name}/control`, control);

// Makefile (OpenWrt build system PKG_VERSION)
let makefile = fs.readFileSync(`${name}/Makefile`, 'utf8');
makefile = makefile.replace(/^PKG_VERSION:=.*$/m, `PKG_VERSION:=${version}`);
fs.writeFileSync(`${name}/Makefile`, makefile);

// build ipk
execSync('bash build.sh', { stdio: 'inherit' });

console.log(`prepared version ${version}`);