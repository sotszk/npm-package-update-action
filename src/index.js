const core = require('@actions/core');
const io = require('@actions/io');
const { exec } = require('@actions/exec');
const os = require('os');
// const github = require('@actions/github');
const { hasMajorUpdate, format, formatForMajorUpdate } = require('./lib');

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

async function executeOutdated(executeDirectory) {
  const execOptions = { ignoreReturnCode: true };
  if (executeDirectory) {
    execOptions.cwd = executeDirectory;
  }

  let stdout = '';
  execOptions.listeners = {
    stdout: (data) => {
      stdout += data.toString();
    },
  };
  const args = ['--long', '--json'];

  await exec('npm outdated', args, execOptions);

  if (stdout.trim().length === 0) {
    return [];
  }

  const json = JSON.parse(stdout);

  return Object.keys(json).map((key) => {
    const { current, wanted, latest, homepage } = json[key];
    return {
      name: key,
      current,
      wanted,
      latest,
      homepage,
    };
  });
}

async function run() {
  try {
    const result = [];

    await io.which('npm', true);
    const options = await getOptions();

    if (options.executeDirectories === null) {
      const packages = await executeOutdated();
      packages.forEach((pkg) => result.push(pkg));
    } else {
      for (let executeDirectory in options.executeDirectories) {
        const packages = await executeOutdated(executeDirectory);
        packages.forEach((pkg) => result.push(pkg));
      }
    }

    core.setOutput('has_npm_update', result.length > 0 ? 'true' : 'false');
    core.setOutput(
      'has_major_npm_update',
      (await hasMajorUpdate(result)) ? 'true' : 'false'
    );
    core.setOutput('npm_update_formatted', await format(result));
    core.setOutput(
      'npm_update_formatted_major_update',
      await formatForMajorUpdate(result)
    );
    core.setOutput('npm_update_json', JSON.stringify(result));
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();

module.exports = run;
