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

module.exports = {
  getMajorVersion,
  hasMajorUpdate,
  format,
};
