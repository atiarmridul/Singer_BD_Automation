# Singer BD Automation Suite

## Project Description

TypeScript + WebdriverIO (v9) + Page Object Model (POM) test automation framework for `https://www.singerbd.com/`.

## Project Structure

```text
.
├── src/pages
│   ├── base.page.ts
│   ├── cart.page.ts
│   ├── home.page.ts
│   └── search-results.page.ts
├── test/data
│   ├── search-keywords.json
│   └── search-keywords.ts
├── test/specs
│   ├── cart.spec.ts
│   ├── home.spec.ts
│   ├── search.smoke.spec.ts
│   └── search.spec.ts
├── agent.md
├── package.json
├── package-lock.json
├── README.md
├── tsconfig.json
└── wdio.conf.ts
```

## Features List

- Page Object Model (POM) Architecture for maintainability.
- Supports both Headless and UI execution.
- Configurable environment options (parallelism, log levels, retries).
- Dedicated execution scripts for Smoke and Regression suites.
- Cross-browser support (Chrome, Firefox).

## Tech Stack

- WebdriverIO (v9)
- TypeScript
- Node.js
- Mocha Framework

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm (Node Package Manager)

### Installation

Clone the repository and install dependencies:
```bash
npm install
```

## Running Tests

Run different test configurations using npm scripts:

- Default test run: `npm test`
- Smoke test suite: `npm run test:smoke`
- Fast smoke test suite: `npm run test:smoke:fast`
- Regression test suite: `npm run test:regression`
- Fast regression suite: `npm run test:regression:fast`
- Headless execution: `npm run test:headless`
- Chrome specific: `npm run test:chrome`
- Firefox specific: `npm run test:firefox`
- Debug mode: `npm run test:debug`

## Show Report

The framework currently uses the WebdriverIO `spec` reporter. Test results, passes, and failures will be printed directly in the console output.

## Configuration

Core configuration is located in `wdio.conf.ts`. You can control runtime behavior using environment variables:
- `MAX_INSTANCES`: Override the worker count
- `LOG_LEVEL`: Override logger verbosity
- `SPEC_RETRIES`: Retry flaky spec files
- `BROWSER`: `chrome` or `firefox`
- `HEADLESS`: set to `true` to run headless

## Troubleshooting

- **Test Timeouts**: If pages load slowly, consider increasing `waitforTimeout` in `wdio.conf.ts`.
- **Selector Failures**: If element selectors fail, verify that the website UI hasn't changed. Update selectors in the corresponding files under `src/pages/`.

## Appendix

N/A

## Dependencies

There are no direct runtime dependencies (only development dependencies are required for test automation).

## Dev Dependencies

- `@types/mocha`
- `@types/node`
- `@wdio/cli`
- `@wdio/globals`
- `@wdio/local-runner`
- `@wdio/mocha-framework`
- `@wdio/spec-reporter`
- `@wdio/types`
- `ts-node`
- `typescript`

## Contributing

1. Keep locators and UI actions inside page objects only (`src/pages`).
2. Keep assertions and scenario flow inside spec files (`test/specs`).
3. Reuse `BasePage` helpers for common shared actions.
4. Verify tests pass locally before submitting code changes.

## License

ISC License.

## Acknowledgements

- WebdriverIO Documentation
- Singer BD

## Contact

Maintainer: Atiar Rahman Chowdhury

## References

- [WebdriverIO Documentation](https://webdriver.io/docs/api)
- [Mocha Framework](https://mochajs.org/)
