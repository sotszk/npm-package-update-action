const wait = require('./wait');
const process = require('process');
const cp = require('child_process');
const path = require('path');

const run = require('.');
// const nock = require('nock');
// const core = require('@actions/core');
// const github = require('@actions/github');

test('throws invalid number', async () => {
  await expect(wait('foo')).rejects.toThrow('milleseconds not a number');
});

test('wait 500 ms', async () => {
  const start = new Date();
  await wait(500);
  const end = new Date();
  var delta = Math.abs(end - start);
  expect(delta).toBeGreaterThan(450);
});

// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', () => {
  process.env['INPUT_MILLISECONDS'] = 500;
  const ip = path.join(__dirname, 'index.js');
  console.log(cp.execSync(`node ${ip}`).toString());
});

test('just run', async (done) => {
  process.env.INPUT_EXECUTE_DIRECTORIES = ['fuga', 'hoge'];
  await run();
  expect(5 + 5).toBe(10);
  done();
});
