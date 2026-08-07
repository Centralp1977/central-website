const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// .git がアセットとして拾われるのを避けるため、Git管理下のサイトファイルだけを dist/ に集める
const EXCLUDE = [
  /^\.claude\//,
  /^\.assetsignore$/,
  /^node_modules\//,
  /^CLAUDE\.md$/,
  /^wrangler\.toml$/,
  /^package(-lock)?\.json$/,
  /^build-dist\.js$/,
  /\.(py|docx|xlsx)$/i,
];

const DIST = path.join(__dirname, 'dist');
fs.rmSync(DIST, { recursive: true, force: true });

const files = execFileSync('git', ['ls-files', '-z'], { cwd: __dirname, maxBuffer: 1 << 28 })
  .toString()
  .split('\0')
  .filter(Boolean)
  .filter((f) => !EXCLUDE.some((re) => re.test(f)));

for (const file of files) {
  const dest = path.join(DIST, file);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(path.join(__dirname, file), dest);
}

console.log(`Copied ${files.length} files to dist/`);
