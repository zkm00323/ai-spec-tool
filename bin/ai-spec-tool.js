#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const ASSET_ROOT = path.resolve(__dirname, "..", "assets");
const TEMPLATE_AGENTS = path.join(ASSET_ROOT, "AGENTS.md");
const TEMPLATE_AGENTS_DIR = path.join(ASSET_ROOT, ".agents");

const START = "<!-- AI-SPEC-TOOL:START -->";
const END = "<!-- AI-SPEC-TOOL:END -->";

function readFile(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function fileEquals(a, b) {
  const aBuf = fs.readFileSync(a);
  const bBuf = fs.readFileSync(b);
  return aBuf.equals(bBuf);
}

function nextIncomingPath(destPath) {
  let candidate = `${destPath}.incoming`;
  if (!fs.existsSync(candidate)) return candidate;
  let i = 1;
  while (fs.existsSync(`${candidate}.${i}`)) i += 1;
  return `${candidate}.${i}`;
}

function copyFileSafe(srcPath, destPath, report) {
  if (!fs.existsSync(destPath)) {
    ensureDir(path.dirname(destPath));
    fs.copyFileSync(srcPath, destPath);
    report.added.push(destPath);
    return;
  }
  if (fileEquals(srcPath, destPath)) {
    report.skipped.push(destPath);
    return;
  }
  const incoming = nextIncomingPath(destPath);
  fs.copyFileSync(srcPath, incoming);
  report.conflicts.push({ target: destPath, incoming });
}

function copyDirSafe(srcDir, destDir, report) {
  ensureDir(destDir);
  const entries = fs.readdirSync(srcDir, { withFileTypes: true });
  entries.forEach((entry) => {
    if (entry.name === ".DS_Store") return;
    const src = path.join(srcDir, entry.name);
    const dest = path.join(destDir, entry.name);
    if (entry.isDirectory()) {
      copyDirSafe(src, dest, report);
      return;
    }
    if (entry.isFile()) {
      copyFileSafe(src, dest, report);
    }
  });
}

function updateAgentsMd(targetPath, report) {
  const template = readFile(TEMPLATE_AGENTS).trimEnd();
  const block = `${START}\n${template}\n${END}\n`;

  if (!fs.existsSync(targetPath)) {
    ensureDir(path.dirname(targetPath));
    fs.writeFileSync(targetPath, block, "utf8");
    report.added.push(targetPath);
    return;
  }

  const current = readFile(targetPath);
  if (current.includes(START) && current.includes(END)) {
    const updated = current.replace(new RegExp(`${START}[\\s\\S]*?${END}`), block.trimEnd());
    if (updated !== current) {
      fs.writeFileSync(targetPath, updated, "utf8");
      report.updated.push(targetPath);
    } else {
      report.skipped.push(targetPath);
    }
    return;
  }

  if (current.trim() === template.trim()) {
    fs.writeFileSync(targetPath, block, "utf8");
    report.updated.push(targetPath);
    return;
  }

  const appended = `${current.trimEnd()}\n\n${block}`;
  fs.writeFileSync(targetPath, appended, "utf8");
  report.updated.push(targetPath);
}

function init() {
  const cwd = process.cwd();
  const targetAgents = path.join(cwd, "AGENTS.md");
  const targetAgentsDir = path.join(cwd, ".agents");

  const report = {
    added: [],
    updated: [],
    skipped: [],
    conflicts: []
  };

  if (!fs.existsSync(TEMPLATE_AGENTS) || !fs.existsSync(TEMPLATE_AGENTS_DIR)) {
    console.error("Assets missing. Please reinstall ai-spec-tool.");
    process.exit(1);
  }

  copyDirSafe(TEMPLATE_AGENTS_DIR, targetAgentsDir, report);
  updateAgentsMd(targetAgents, report);

  console.log("ai-spec-tool init complete.");
  console.log(`Added: ${report.added.length}`);
  console.log(`Updated: ${report.updated.length}`);
  console.log(`Skipped: ${report.skipped.length}`);
  console.log(`Conflicts: ${report.conflicts.length}`);

  if (report.conflicts.length) {
    console.log("\nConflicts (new versions saved as .incoming):");
    report.conflicts.forEach((conflict) => {
      console.log(`- ${conflict.target} -> ${conflict.incoming}`);
    });
  }
}

function main() {
  const [command] = process.argv.slice(2);
  if (!command || command === "help" || command === "--help" || command === "-h") {
    console.log("ai-spec-tool\n\nUsage:\n  ai-spec-tool init\n");
    return;
  }
  if (command === "init") {
    init();
    return;
  }
  console.error(`Unknown command: ${command}`);
  process.exit(1);
}

main();
