# AGENT.md

## Purpose
This repository contains web automation for `https://www.singerbd.com/` using:
- WebdriverIO v9
- TypeScript
- Mocha
- Page Object Model (POM)

## Project Layout
- `src/pages/`: page objects (locators + actions)
- `test/specs/`: test scenarios
- `test/data/`: test data
- `wdio.conf.ts`: test runner config and suites

## Setup
```bash
npm install
```

## Run Commands
```bash
npm test
npm run test:smoke
npm run test:regression
npm run test:headless
npm run test:firefox
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
