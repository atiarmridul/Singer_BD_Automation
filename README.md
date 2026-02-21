# Singer BD Automation Suite

TypeScript + WebdriverIO (v9) + Page Object Model (POM) test framework for `https://www.singerbd.com/`.

## Tech Stack
- WebdriverIO
- TypeScript
- Mocha
- POM

## Structure
```text
.
├── src/pages
│   ├── base.page.ts
│   ├── home.page.ts
│   ├── search-results.page.ts
│   ├── cart.page.ts
│   └── ecatalogue.page.ts
├── test/data
│   └── search-keywords.ts
├── test/specs
│   ├── home.spec.ts
│   ├── search.spec.ts
│   ├── cart.spec.ts
│   └── ecatalogue.spec.ts
├── wdio.conf.ts
├── tsconfig.json
└── package.json
```

## Setup
```bash
npm install
```

## Run
```bash
npm test
npm run test:smoke
npm run test:regression
npm run test:headless
npm run test:firefox
```

## Notes
- Default browser: Chrome
- Use Firefox: `BROWSER=firefox npm test`
