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
      expect(formatted).toBeTruthy();
      done();
    });
  });

  describe('formatToColumns', () => {
    test('correct', async (done) => {
      const fixture = require('./fixtures/major-update.json');
      const columns = await lib.formatToColumns(fixture);
      expect(columns).toBeTruthy();
      done();
    });
  });

  describe('formatForMajorUpdate', () => {
    test('correct', async (done) => {
      const fixture = require('./fixtures/major-update.json');
      const formatted = await lib.formatForMajorUpdate(fixture);
      expect(formatted).toBeTruthy();
      done();
    });
  });

  describe('formatToColumnsWithoutMajorUpdate', () => {
    test('correct', async (done) => {
      const fixture = require('./fixtures/major-update.json');
      const formatted = await lib.formatToColumnsWithoutMajorUpdate(fixture);
      expect(formatted).toBeTruthy();
      done();
    });
  });
});
