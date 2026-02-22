import type { Options } from '@wdio/types';

const browserName = (process.env.BROWSER || 'chrome').toLowerCase();
const isHeadless = process.env.HEADLESS === 'true' || process.env.HEADLESS === '1';
const configuredInstances = Number(process.env.MAX_INSTANCES);
const defaultMaxInstances = isHeadless ? 3 : 1;
const maxInstances =
  Number.isFinite(configuredInstances) && configuredInstances > 0
    ? configuredInstances
    : defaultMaxInstances;
const configuredLogLevel = process.env.LOG_LEVEL as WebdriverIO.Config['logLevel'] | undefined;
const logLevel = configuredLogLevel ?? (isHeadless ? 'warn' : 'info');
const configuredSpecRetries = Number(process.env.SPEC_RETRIES);
const specFileRetries =
  Number.isFinite(configuredSpecRetries) && configuredSpecRetries >= 0 ? configuredSpecRetries : 0;

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
  specs: ['./test/specs/home.spec.ts'],
  exclude: [],
  maxInstances,
  capabilities,
  logLevel,
  bail: 0,
  waitforTimeout: 10000,
  waitforInterval: 300,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 1,
  specFileRetries,
  specFileRetriesDeferred: true,
  framework: 'mocha',
  reporters: ['spec'],
  mochaOpts: {
    ui: 'bdd',
    timeout: 120000
  },

  baseUrl: 'https://www.singerbd.com',
  suites: {
    smoke: ['./test/specs/home.spec.ts'],
    regression: ['./test/specs/home.spec.ts']
  },
  before: async () => {
    try {
      await browser.maximizeWindow();
    } catch {
      // maximizeWindow may be unsupported in some headless or mobile-like runs.
    }
  }
};
