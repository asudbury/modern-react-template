# Contributing to modern-react-template

Thanks for your interest in contributing! This repository is a modern React 19 + Vite + TypeScript template focused on accessibility, type safety, and great tooling. Contributions that improve the template, docs, or tooling are very welcome.

## Ways to Contribute

- Report bugs or issues
- Suggest improvements to the template or tooling
- Improve documentation
- Add or improve tests

Please use GitHub Issues and Pull Requests for all contributions.

## Getting Started

1. **Fork** the repository and create a branch:
   - Branch naming suggestion: `feat/your-feature`, `fix/your-bug`, or `docs/your-doc-change`.
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Run the dev server**:
   ```bash
   npm run dev
   ```

See `SETUP.md` and `README.md` for more details.

## Coding Guidelines

This project has detailed conventions in `.github/copilot-instructions.md`. In summary:

- React 19, Vite 7, TypeScript 5
- Accessibility-first (WCAG 2.2 AA)
- Strict TypeScript (no `any` without strong justification)
- Named exports only (no default exports)
- No inline JSX event handlers (use `useCallback` or stable handlers)
- Design tokens via Tailwind (`src/styles/tokens.css`) – no hardcoded colors
- TanStack React Query for server state
- Context + reducer for client state

Before opening a PR, please:

- Ensure `npm run lint` passes
- Ensure `npm run test:unit` passes
- Ensure `npm run build` succeeds

## Tests

- Unit tests use Vitest + React Testing Library.
- E2E tests use Playwright + Axe for accessibility checks.

When adding new components or features, prefer adding or updating tests alongside your changes.

## Pull Requests

- Keep PRs focused and small when possible.
- Describe what changed, why, and any impact on accessibility or APIs.
- Reference related issues if applicable.

## Code of Conduct

Please be respectful and constructive. This project follows the principles of the Microsoft Open Source Code of Conduct:

- <https://opensource.microsoft.com/codeofconduct/>
- <https://opensource.microsoft.com/codeofconduct/faq/>
- Email: <opencode@microsoft.com>
