const core = require('@actions/core');
// const github = require('@actions/github');
// const wait = require('./wait');

async function run() {
  try {
    const executeDirs = core.getInput('execute_directories');
    console.log(executeDirs.length);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();

module.exports = run;
