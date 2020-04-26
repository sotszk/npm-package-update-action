const os = require('os');

const getMajorVersion = (versionString) => {
  return parseInt(versionString.split('.')[0]);
};

const hasMajorUpdate = async (pkgs) => {
  return pkgs.some(({ current, latest }) => {
    const currentMajorVersion = getMajorVersion(current);
    const latestMajorVersion = getMajorVersion(latest);
    return latestMajorVersion > currentMajorVersion;
  });
};

const format = async (pkgs) => {
  let result = '';
  pkgs.forEach((pkg, index) => {
    if (index > 0) {
      result += os.EOL;
    }
    result += `${pkg.name}: ${pkg.current}(current), ${pkg.wanted}(wanted), ${pkg.latest}(latest)`;
  });
  return result;
};

const formatForMajorUpdate = async (pkgs) => {
  let result = '';
  pkgs.forEach((pkg, index) => {
    if (getMajorVersion(pkg.latest) <= getMajorVersion(pkg.current)) {
      return;
    }
    if (index > 0) {
      result += os.EOL;
    }
    result += `${pkg.name}: ${pkg.current} -> ${pkg.latest} see ${pkg.homepage}`;
  });
  return result;
};

const formatToColumns = async (pkgs) => {
  let result = '';
  if (!pkgs.length) return '';

  const keys = Object.keys(pkgs[0]);

  const header = '|' + keys.join('|') + '|';
  const alignRow = '|' + keys.map(() => ':--').join('|') + '|';
  const body = pkgs.map((pkg, index) => {
    let row = '';
    if (index > 0) {
      row += os.EOL;
    }
    row += '|' + Object.values(pkg).join('|') + '|';
    return row;
  });

  result += [header, alignRow, body].join(os.EOL);
  return result;
};

const formatToColumnsWithoutMajorUpdate = async (pkgs) => {
  let result = '';
  if (!pkgs.length) return '';

  const keys = Object.keys(pkgs[0]).filter((key) => key !== 'latest');

  const header = '|' + keys.join('|') + '|';
  const alignRow = '|' + keys.map(() => ':--').join('|') + '|';
  const body = pkgs.map((pkg, index) => {
    let row = '';
    if (index > 0) {
      row += os.EOL;
    }
    const values = keys.map((key) => pkg[key]);
    row += '|' + values.join('|') + '|';
    return row;
  });

  result += [header, alignRow, body].join(os.EOL);
  return result;
};

module.exports = {
  getMajorVersion,
  hasMajorUpdate,
  format,
  formatForMajorUpdate,
  formatToColumns,
  formatToColumnsWithoutMajorUpdate,
};
