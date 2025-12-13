const fs = require('fs');
const path = require('path');

function bumpSemver(version, type) {
  const [major, minor, patch] = version.split('.').map(Number);
  if (type === 'major') return `${major + 1}.0.0`;
  if (type === 'minor') return `${major}.${minor + 1}.0`;
  return `${major}.${minor}.${patch + 1}`; // patch
}

function readJSON(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function writeJSON(p, obj) {
  fs.writeFileSync(p, JSON.stringify(obj, null, 2) + '\n', 'utf8');
}

function updateVersionFile(versionFilePath, newVersion) {
  let content = fs.readFileSync(versionFilePath, 'utf8');
  content = content.replace(/export const APP_VERSION = '([^']+)'/,
    `export const APP_VERSION = '${newVersion}'`);
  fs.writeFileSync(versionFilePath, content, 'utf8');
}

function main() {
  const type = process.argv[2] || 'patch';
  const root = process.cwd();
  const pkgPath = path.join(root, 'package.json');
  const versionFilePath = path.join(root, 'src', 'config', 'version.js');

  const pkg = readJSON(pkgPath);
  const current = pkg.version || '1.0.0';
  const next = bumpSemver(current, type);

  // update package.json
  pkg.version = next;
  writeJSON(pkgPath, pkg);

  // update src/config/version.js
  updateVersionFile(versionFilePath, next);

  console.log(`Version bumped: ${current} -> ${next}`);
}

if (require.main === module) {
  main();
}
