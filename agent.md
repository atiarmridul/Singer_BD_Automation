# AGENT.md

## Purpose
This repository contains web automation for `https://www.singerbd.com/` using:
- WebdriverIO v9
- TypeScript
- Mocha
- Page Object Model (POM)

## Project Layout

```text
.
├── src/pages
│   ├── base.page.ts
│   ├── cart.page.ts
│   ├── home.page.ts
│   └── search-results.page.ts
├── src/mcp
│   └── server.ts
├── test/data
│   ├── search-keywords.json
│   └── search-keywords.ts
└── test/specs
    ├── cart.spec.ts
    ├── home.spec.ts
    ├── search.smoke.spec.ts
    └── search.spec.ts
```
- Configs and setup: `wdio.conf.ts`, `tsconfig.json`, `package.json`
- Search keywords are managed in `test/data/search-keywords.json`

## Setup
```bash
npm install
```

## Run Commands
```bash
npm test
npm run test:smoke
npm run test:smoke:fast
npm run test:regression
npm run test:regression:fast
npm run test:headless
npm run test:chrome
npm run test:firefox
npm run test:debug
npm run mcp:server
```

## Authoring Rules
- Keep locators and UI actions inside page objects only.
- Keep assertions and scenario flow inside spec files.
- Reuse `BasePage` helpers for common actions.
- Prefer stable selectors (`id`, `name`, semantic attributes) over fragile CSS chains.
- Avoid hard sleeps; use explicit waits (`waitForDisplayed`, `waitForClickable`, `waitUntil`).

## Naming Conventions
- Page objects: `*.page.ts`
- Specs: `*.spec.ts`
- Test data: descriptive files under `test/data`

## Pull Request Checklist
- Tests pass locally for changed specs.
- No duplicated selectors across specs.
- New flows include both positive checks and resilient waits.
- README and config updated when commands/suites change.
