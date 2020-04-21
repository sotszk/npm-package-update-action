const core = require('@actions/core');
const wait = require('./wait');

// most @actions toolkit packages have async methods
async function run() {
  try {
    const input = core.getInput('input');
    core.debug(input);
    await wait(2000);
    core.setOutput('out', input);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
