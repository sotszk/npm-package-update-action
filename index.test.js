const wait = require('./wait');
const process = require('process');
const cp = require('child_process');
const path = require('path');

// const run = require('.');
const nock = require('nock');
// const core = require('@actions/core');
// const github = require('@actions/github');

nock.disableNetConnect();

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

// beforeEach(() => {
//   jest.resetModules();

//   github.context.payload = {
//     action: 'opened',
//     pull_request: {
//       number: 1,
//     },
//   };
// });

// describe('run action', () => {
//   test('comments on PR', async (done) => {
//     process.env['INPUT_MESSAGE'] = 'Test Comment';
//     process.env['GITHUB_REPOSITORY'] = 'testorg/testrepo';
//     process.env['GITHUB_TOKEN'] = 'test-github-token';

//     nock('https://api.github.com')
//       .post(
//         '/repos/testorg/testrepo/issues/1/comments',
//         ({ body }) => body === 'Test Comment'
//       )
//       .reply(200, {
//         html_url: 'https://github.com/testorg/testrepo/issues/1#issuecomment-1',
//       });
//     const setOutputMock = jest.spyOn(core, 'setOutput');

//     await run();

//     expect(10).toBe(10);

//     expect(setOutputMock).toHaveBeenCalledWith(
//       'commentUrl',
//       'https://github.com/testorg/testrepo/issues/1#issuecomment-1'
//     );

//     done();
//   });
// });
