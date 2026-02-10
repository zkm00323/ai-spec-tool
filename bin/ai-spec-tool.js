#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const readline = require("readline");

const ASSET_ROOT = path.resolve(__dirname, "..", "assets");
const TEMPLATE_AGENTS = path.join(ASSET_ROOT, "AGENTS.md");
const TEMPLATE_AGENTS_DIR = path.join(ASSET_ROOT, ".agents");
const TEMPLATE_DOCS_DIR = path.join(ASSET_ROOT, "docs");

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

function copyFileSafe(srcPath, destPath, report, options) {
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
  if (options.force) {
    fs.copyFileSync(srcPath, destPath);
    report.updated.push(destPath);
    return;
  }
  const incoming = nextIncomingPath(destPath);
  fs.copyFileSync(srcPath, incoming);
  report.conflicts.push({ target: destPath, incoming });
}

function copyDirSafe(srcDir, destDir, report, options) {
  ensureDir(destDir);
  const entries = fs.readdirSync(srcDir, { withFileTypes: true });
  entries.forEach((entry) => {
    if (entry.name === ".DS_Store") return;
    const src = path.join(srcDir, entry.name);
    const dest = path.join(destDir, entry.name);
    if (entry.isDirectory()) {
      copyDirSafe(src, dest, report, options);
      return;
    }
    if (entry.isFile()) {
      copyFileSafe(src, dest, report, options);
    }
  });
}

function askYesNo(prompt) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      rl.close();
      const normalized = String(answer || "").trim().toLowerCase();
      resolve(normalized === "y" || normalized === "yes");
    });
  });
}

async function resolveConflictsInteractively(report, options) {
  if (!report.conflicts.length || !options.ask) return;
  if (!process.stdin.isTTY) return;

  for (const conflict of report.conflicts) {
    const prompt = `Overwrite ${conflict.target} with incoming? (y/N) `;
    const yes = await askYesNo(prompt);
    if (yes) {
      fs.copyFileSync(conflict.incoming, conflict.target);
      report.updated.push(conflict.target);
      report.conflictsResolved.push(conflict.target);
      fs.unlinkSync(conflict.incoming);
    }
  }
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

async function init(options) {
  const cwd = process.cwd();
  const targetAgents = path.join(cwd, "AGENTS.md");
  const targetAgentsDir = path.join(cwd, ".agents");

  const report = {
    added: [],
    updated: [],
    skipped: [],
    conflicts: [],
    conflictsResolved: []
  };

  if (!fs.existsSync(TEMPLATE_AGENTS) || !fs.existsSync(TEMPLATE_AGENTS_DIR)) {
    console.error("Assets missing. Please reinstall ai-spec-tool.");
    process.exit(1);
  }

  copyDirSafe(TEMPLATE_AGENTS_DIR, targetAgentsDir, report, options);
  if (fs.existsSync(TEMPLATE_DOCS_DIR)) {
    const targetDocsDir = path.join(cwd, "docs");
    copyDirSafe(TEMPLATE_DOCS_DIR, targetDocsDir, report, options);
  }
  updateAgentsMd(targetAgents, report);
  await resolveConflictsInteractively(report, options);

  console.log("ai-spec-tool init complete.");
  console.log(`Added: ${report.added.length}`);
  console.log(`Updated: ${report.updated.length}`);
  console.log(`Skipped: ${report.skipped.length}`);
  console.log(`Conflicts: ${report.conflicts.length}`);
  if (report.conflictsResolved.length) {
    console.log(`Resolved: ${report.conflictsResolved.length}`);
  }

  if (report.conflicts.length) {
    console.log("\nConflicts (new versions saved as .incoming):");
    report.conflicts.forEach((conflict) => {
      console.log(`- ${conflict.target} -> ${conflict.incoming}`);
    });
  }
}

function main() {
  const [command, ...args] = process.argv.slice(2);
  const options = {
    force: args.includes("--force"),
    ask: args.includes("--ask")
  };
  if (!command || command === "help" || command === "--help" || command === "-h") {
    console.log("ai-spec-tool\n\nUsage:\n  ai-spec-tool init [--force|--ask]\n");
    return;
  }
  if (command === "init") {
    init(options).catch((err) => {
      console.error(err?.message || err);
      process.exit(1);
    });
    return;
  }
  console.error(`Unknown command: ${command}`);
  process.exit(1);
}

main();
