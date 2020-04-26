const run = require('../src');
const lib = require('../src/lib');

describe('run', () => {
  test('run', async (done) => {
    process.env.INPUT_EXECUTE_DIRECTORIES = `
      aa
      bb
    `;
    await run();
    done();
  });
});

describe('lib', () => {
  describe('getMajorVersion', () => {
    test('correct', () => {
      const versionString = '8.9.1';
      expect(lib.getMajorVersion(versionString)).toBe(8);
    });
  });

  describe('hasMajorUpdate', () => {
    test('exists', async (done) => {
      const fixture = require('./fixtures/major-update.json');
      const result = await lib.hasMajorUpdate(fixture);
      expect(result).toBe(true);
      done();
    });
    test('does not exist', async (done) => {
      const fixture = require('./fixtures/no-major-update.json');
      const result = await lib.hasMajorUpdate(fixture);
      expect(result).toBe(false);
      done();
    });
  });

  describe('format', () => {
    test('correct', async (done) => {
      const fixture = require('./fixtures/major-update.json');
      const formatted = await lib.format(fixture);
      expect(formatted)
        .toStrictEqual(`@zeit/ncc: 0.20.5(current), 0.20.5(wanted), 0.22.1(latest)
eslint-config-prettier: 6.10.1(current), 6.11.0(wanted), 6.11.0(latest)
jest: 24.9.0(current), 24.9.0(wanted), 25.4.0(latest)
prettier: 2.0.4(current), 2.0.5(wanted), 2.0.5(latest)`);
      done();
    });
  });
});
