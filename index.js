const core = require('@actions/core');
const io = require('@actions/io');
const { exec } = require('@actions/exec');
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

async function executeOutdated(executeDirectory) {
  const execOptions = {};
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

  await exec('npm outdated');
  // core.debug(stdout);
  return [(stdout && JSON.parse(stdout)) || null];

  // ---
  // if (stdout.trim().length === 0) {
  //   return [];
  // }

  // const json = JSON.parse(stdout);
  // core.debug(json);

  // return Object.keys(json).map((key) => {
  //   const { current, wanted, latest, homepage } = json[key];
  //   console.log('values: ', current, wanted, latest, homepage);
  //   return {
  //     name: key,
  //     current,
  //     wanted,
  //     latest,
  //     homepage,
  //   };
  // });
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
      const packages = await executeOutdated();
      packages.forEach((pkg) => result.push(pkg));
    } else {
      for (let executeDirectory in options.executeDirectories) {
        const packages = await executeOutdated(executeDirectory);
        packages.forEach((pkg) => result.push(pkg));
      }
    }

    core.setOutput('has_npm_update', 'true');
    core.setOutput('has_major_npm_update', 'false');
    // core.setOutput(
    //   'npm_update_formatted',
    //   options.executeDirectories.join(',')
    // );
    core.setOutput('npm_update_json', JSON.stringify(result));
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();

module.exports = run;
