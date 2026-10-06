#!/usr/bin/env bash
#
# Everything a change has to pass before it reaches main, run in the container.
# `npm run check:merge`. Every step runs even after one fails; the failures are
# named at the end and the exit code is 1 if there were any.
set -uo pipefail
cd "$(dirname "$0")/.."

[[ -d node_modules ]] || npm ci --no-audit --no-fund >/dev/null || { echo "npm ci failed" >&2; exit 1; }
git fetch --quiet origin main 2>/dev/null || echo "warning: could not fetch origin/main; using the local copy" >&2

FAILED=()
step() {
  local name="$1"; shift
  echo
  echo "=== $name"
  "$@" || FAILED+=("$name")
}

step "Em dashes" node scripts/lint-em-dashes.mjs
step "Post URLs" node scripts/check-urls.mjs
step "Type check" npm run --silent check
step "Build" npm run --silent build

echo
if [[ ${#FAILED[@]} -gt 0 ]]; then
  echo "Merge check FAILED: ${FAILED[*]}."
  exit 1
fi
echo "Merge check passed."
