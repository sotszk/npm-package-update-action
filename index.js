const core = require('@actions/core');
const io = require('@actions/io');
const os = require('os');
// const github = require('@actions/github');

async function getOptions() {
  const executeDirectories = core
    .getInput('execute_directories')
    .split(os.EOL)
    .map((item) => item.trim());

  return {
    executeDirectories:
      executeDirectories.length === 1 && executeDirectories[0].length === 0
        ? null
        : executeDirectories,
  };
}

async function executeOutdated() {
  return [];
}

async function run() {
  try {
    core.debug('Inside try block');

    const result = [];

    const which = await io.which('npm', true);
    // console.log('which', which);

    const options = await getOptions();
    // console.log(options);

    if (options.executeDirectories === null) {
      const packages = executeOutdated();
      packages.forEach((item) => result.push(item));
    }

    core.setOutput('has_npm_update', true);
    core.setOutput('has_major_npm_update', false);
    core.setOutput('npm_update_formatted', '');
    core.setOutput('npm_update_json', JSON.stringify(result));
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();

module.exports = run;
