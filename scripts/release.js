#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const root = path.resolve(__dirname, "..");
const pkgPath = path.join(root, "package.json");
const changelogPath = path.join(root, "CHANGELOG.md");

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n", "utf8");
}

function getToday() {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function bumpVersion(current, type) {
  const parts = current.split(".").map((v) => parseInt(v, 10));
  if (parts.length !== 3 || parts.some(Number.isNaN)) {
    throw new Error(`Invalid version: ${current}`);
  }
  if (type === "patch") {
    parts[2] += 1;
  } else if (type === "minor") {
    parts[1] += 1;
    parts[2] = 0;
  } else if (type === "major") {
    parts[0] += 1;
    parts[1] = 0;
    parts[2] = 0;
  } else {
    throw new Error(`Unknown bump type: ${type}`);
  }
  return parts.join(".");
}

function ensureChangelog() {
  if (!fs.existsSync(changelogPath)) {
    fs.writeFileSync(
      changelogPath,
      "# Changelog\n\nAll notable changes to this project will be documented in this file.\n\n",
      "utf8"
    );
  }
}

function getGitChanges(currentVersion) {
  try {
    const tag = `v${currentVersion}`;
    const hasTag = execSync(`git tag -l ${tag}`, { cwd: root, stdio: ["ignore", "pipe", "ignore"] })
      .toString()
      .trim();
    const range = hasTag ? `${tag}..HEAD` : "HEAD~20..HEAD";
    const log = execSync(`git log ${range} --pretty=%s --no-merges`, {
      cwd: root,
      stdio: ["ignore", "pipe", "ignore"]
    })
      .toString()
      .trim();
    if (!log) return [];
    return log.split("\n").map((line) => line.trim()).filter(Boolean);
  } catch (err) {
    return [];
  }
}

function updateChangelog(version, currentVersion) {
  ensureChangelog();
  const today = getToday();
  const content = fs.readFileSync(changelogPath, "utf8");
  const changes = getGitChanges(currentVersion);
  const bullets = changes.length ? changes.map((item) => `- ${item}`).join("\n") : "- Updated agents and templates.";
  const entry = `## ${version} - ${today}\n\n${bullets}\n\n`;

  if (content.includes(`## ${version} - ${today}`)) return;

  const insertAt = content.indexOf("\n\n", content.indexOf("# Changelog"));
  if (insertAt === -1) {
    fs.writeFileSync(changelogPath, content + "\n" + entry, "utf8");
    return;
  }

  const updated = content.slice(0, insertAt + 2) + entry + content.slice(insertAt + 2);
  fs.writeFileSync(changelogPath, updated, "utf8");
}

function main() {
  const [type] = process.argv.slice(2);
  if (!type) {
    console.error("Usage: node scripts/release.js <patch|minor|major>");
    process.exit(1);
  }

  try {
    const status = execSync("git status --porcelain", { cwd: root, stdio: ["ignore", "pipe", "ignore"] })
      .toString()
      .trim();
    if (status) {
      console.error("Working tree is not clean. Please commit or stash changes before releasing.");
      process.exit(1);
    }
  } catch (err) {
    console.error("Failed to check git status. Ensure this is a git repository.");
    process.exit(1);
  }

  const pkg = readJson(pkgPath);
  const current = pkg.version;
  const next = bumpVersion(pkg.version, type);
  pkg.version = next;
  writeJson(pkgPath, pkg);
  updateChangelog(next, current);
  execSync(`git add ${pkgPath} ${changelogPath}`, { cwd: root, stdio: "ignore" });
  execSync(`git commit -m \"chore(release): v${next}\"`, { cwd: root, stdio: "ignore" });
  execSync(`git tag v${next}`, { cwd: root, stdio: "ignore" });
  console.log(`Version bumped to ${next}`);
}

main();
