#!/bin/sh
orig="$(cat)"
lower="$(printf "%s" "$orig" | tr '[:upper:]' '[:lower:]')"
# Heuristic mappings for common keywords
if printf "%s" "$lower" | grep -q "initial commit"; then
  echo "chore: initial commit"
  exit 0
fi
if printf "%s" "$lower" | grep -q "gitleaks\|gitleak"; then
  echo "chore(security): ${orig}"
  exit 0
fi
if printf "%s" "$lower" | grep -q "readme\|read me"; then
  echo "docs: ${orig}"
  exit 0
fi
if printf "%s" "$lower" | grep -q "deepwiki"; then
  echo "docs: add DeepWiki link"
  exit 0
fi
if printf "%s" "$lower" | grep -q "features.md\|features"; then
  echo "docs: update FEATURES.md"
  exit 0
fi
if printf "%s" "$lower" | grep -q "knip"; then
  echo "ci(knip): ${orig}"
  exit 0
fi
if printf "%s" "$lower" | grep -q "ci\|workflow\|github action\|github-actions\|actions\|pipeline"; then
  echo "ci: ${orig}"
  exit 0
fi
if printf "%s" "$lower" | grep -q "sonar\|sonarqube\|sonarcloud"; then
  echo "ci: ${orig}"
  exit 0
fi
if printf "%s" "$lower" | grep -q "test\|unit test\|tests\|vitest\|playwright"; then
  echo "test: ${orig}"
  exit 0
fi
if printf "%s" "$lower" | grep -q "zod\|globalthis\|type\|types\|typescript"; then
  echo "fix(types): ${orig}"
  exit 0
fi
if printf "%s" "$lower" | grep -q "sonar|lint|eslint|prettier"; then
  echo "chore: ${orig}"
  exit 0
fi
# Default: preserve original but normalize leading 'feat:' to 'feat:' and lowercase prefix where obvious
if printf "%s" "$lower" | grep -q "^feat\|^fix\|^chore\|^docs\|^ci\|^test\|^refactor\|^perf"; then
  echo "$orig"
  exit 0
fi
# Fallback: leave message unchanged
echo "$orig"
