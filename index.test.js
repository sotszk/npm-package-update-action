const run = require('.');

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
