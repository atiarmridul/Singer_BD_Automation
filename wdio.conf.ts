import type { Options } from '@wdio/types';

const browserName = (process.env.BROWSER || 'chrome').toLowerCase();
const isHeadless = process.env.HEADLESS === 'true' || process.env.HEADLESS === '1';

const chromeArgs = [
  '--window-size=1920,1080',
  '--disable-gpu',
  '--no-sandbox',
  '--disable-dev-shm-usage'
];

if (isHeadless) {
  chromeArgs.push('--headless=new');
}

const firefoxArgs = ['-width=1920', '-height=1080'];
if (isHeadless) {
  firefoxArgs.push('-headless');
}

const capabilities: WebdriverIO.Capabilities[] =
  browserName === 'firefox'
    ? [
        {
          browserName: 'firefox',
          'moz:firefoxOptions': {
            args: firefoxArgs
          }
        }
      ]
    : [
        {
          browserName: 'chrome',
          'goog:chromeOptions': {
            args: chromeArgs
          }
        }
      ];

export const config: WebdriverIO.Config = {
  runner: 'local',
  specs: ['./test/specs/**/*.spec.ts'],
  exclude: [],
  maxInstances: 1,
  capabilities,
  logLevel: 'info',
  bail: 0,
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 1,
  framework: 'mocha',
  reporters: ['spec'],
  mochaOpts: {
    ui: 'bdd',
    timeout: 120000
  },

  baseUrl: 'https://www.singerbd.com',
  suites: {
    smoke: ['./test/specs/home.spec.ts', './test/specs/search.spec.ts'],
    regression: ['./test/specs/**/*.spec.ts']
  },
  before: async () => {
    try {
      await browser.maximizeWindow();
    } catch {
      // maximizeWindow may be unsupported in some headless or mobile-like runs.
    }
  }
};
