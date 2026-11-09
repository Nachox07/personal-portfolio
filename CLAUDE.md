# personal-portfolio

Next.js site deployed to garilleti.me by Vercel on every push to `main`. Never push to `main`; open a PR from a branch.

Before opening a PR:

```bash
npm run lint
npm run build
npm run test:visual   # Playwright: phone and desktop, light and dark
```

`test:visual` builds the site with a pinned timeline date and compares screenshots against `tests/visual.spec.ts-snapshots/`. If a change is intended, run `npm run test:visual:update`, open the new PNGs and check them before committing. Baselines are macOS renders; on Linux they will differ.

Content lives in `lib/data.ts`. Every fact there comes from the owner; do not add claims, numbers, employers or skills without his approval.

## Tracking work

This repository is public. Never put draft articles, open questions for the owner, unreviewed numbers, secrets or Claude session links in commits, PRs or issues. Ask the owner in chat.

- Work starts as an issue from `.github/ISSUE_TEMPLATE/` (work, bug or owner action), with acceptance criteria that say how each one is checked.
- PRs follow `.github/pull_request_template.md`: before/after screenshots for anything visual, and the test, build and Lighthouse results.
- Every design or content decision gets a bullet in `docs/decisions.md` in the same PR, with its reason.
