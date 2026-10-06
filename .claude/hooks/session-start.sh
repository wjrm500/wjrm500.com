#!/bin/bash
# Installs dependencies when a Claude Code web session starts, so the first
# `npm run check:merge` does not pay for it. The container is cached after this
# hook, so later sessions find node_modules and skip it.
set -euo pipefail

# Local (CLI) sessions manage their own environment.
[ "${CLAUDE_CODE_REMOTE:-}" = "true" ] || exit 0

cd "$CLAUDE_PROJECT_DIR"
[ -d node_modules ] || npm ci --no-audit --no-fund
