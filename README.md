# ai-spec-tool

Installable agents + rules for AI spec workflows.

## Usage

```bash
npx ai-spec-tool init
```

### What it does

- Installs `.agents/` into the current project (merge-safe).
- Updates/creates `AGENTS.md` using an anchored block so local edits are preserved.
- Conflicts are written as `*.incoming` next to the original file.

### AGENTS.md update strategy

The CLI looks for the block below and replaces its content if present. If not found, it appends the block.

```
<!-- AI-SPEC-TOOL:START -->
... managed content ...
<!-- AI-SPEC-TOOL:END -->
```

## Conflict handling

- New file missing: copy in
- Same file: skip
- Different file: write `<file>.incoming` (do not overwrite your file)

## Requirements

- Node.js 18+

## Release workflow

1. Update assets under `assets/` if needed.
2. Bump version and update changelog (requires clean git status):
   - `npm run version:patch`
   - `npm run version:minor`
   - `npm run version:major`
   - The changelog auto-includes recent git commit subjects (last tag or last 20 commits).
   - The script commits and tags the release as `vX.Y.Z`.
3. Publish:
   - `npm publish --access public`
