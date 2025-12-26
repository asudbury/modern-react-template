#!/bin/sh
case "$GIT_COMMIT" in
8fd725c*)
cat <<'MSG'
ci: add CodeQL badge and static analysis documentation
MSG
;;
122a0e6*)
cat <<'MSG'
ci: refine CI workflows and test steps
MSG
;;
5c27f0f*)
cat <<'MSG'
ci: tweak CI configuration
MSG
;;
cb8644a*)
cat <<'MSG'
docs: update README content
MSG
;;
a5c70f6*)
cat <<'MSG'
chore(security): add Gitleaks configuration
MSG
;;
919b7f5*)
cat <<'MSG'
chore(deps/docs): update dependencies; fix docs inconsistencies (#22)
MSG
;;
90cddc5*)
cat <<'MSG'
docs: polish README
MSG
;;
d3c4714*)
cat <<'MSG'
ci(knip): tweak knip step in CI
MSG
;;
c20e55b*)
cat <<'MSG'
chore: add knip dependency and config
MSG
;;
74a06a5*)
cat <<'MSG'
docs: update README examples
MSG
;;
5ed047b*)
cat <<'MSG'
docs: add DeepWiki link
MSG
;;
60681d3*)
cat <<'MSG'
docs: restore AGENTS.md
MSG
;;
4c32133*)
cat <<'MSG'
docs: update README formatting
MSG
;;
4df6169*)
cat <<'MSG'
docs: fix README link to lite repo
MSG
;;
6aecc44*)
cat <<'MSG'
docs: update README
MSG
;;
88f657d*)
cat <<'MSG'
test: update unit tests
MSG
;;
f6b70b3*)
cat <<'MSG'
docs: update FEATURES.md
MSG
;;
7387b82*)
cat <<'MSG'
fix(types): fix Zod schemas and globalThis usage
MSG
;;
901ea99*)
cat <<'MSG'
test: add HomePage unit tests
MSG
;;
*)
cat
;;
esac
