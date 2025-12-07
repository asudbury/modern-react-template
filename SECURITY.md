# Security Policy

## Reporting a Vulnerability

If you believe you have found a security vulnerability in this project or in any dependency configuration used by this template:

1. **Do not** open a public GitHub issue with sensitive details.
2. Instead, please report it privately to the repository maintainer (for example, via GitHub security advisories or direct contact if available in the repo profile).
3. Provide as much detail as possible so the issue can be reproduced and investigated:
   - Steps to reproduce
   - Impact and severity
   - Any suggested mitigations

We aim to:

- Acknowledge receipt of your report in a reasonable time.
- Investigate and validate the issue.
- Prepare a fix or mitigation.
- Coordinate a responsible disclosure timeline if needed.

## Supported Versions

This repository is a template rather than a production service. Security fixes are typically applied to the `main` branch. Users of the template are encouraged to:

- Keep dependencies up to date (e.g., using Dependabot or Renovate).
- Regularly run `npm audit` or similar tools.

## Best Practices for Template Users

If you use this template to build your own app:

- Keep your dependencies patched and up to date.
- Do not commit secrets (API keys, tokens, passwords) to source control.
- Use environment variables and secret managers for sensitive data.
- Review and harden your deployment environment (HTTPS, CSP, etc.).
