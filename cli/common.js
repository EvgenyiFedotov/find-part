const fs = require('fs');

const cloneDir = (fromPath, toPath, params = {}) => {
  const { fileCallback } = params;

  if (!fs.existsSync(toPath)) {
    fs.mkdirSync(toPath);
  }

  fs.readdirSync(fromPath).forEach((fileName) => {
    const fromPathFile = `${fromPath}/${fileName}`;
    const toPathFile = `${toPath}/${fileName}`;

    if (fs.statSync(fromPathFile).isDirectory()) {
      cloneDir(fromPathFile, toPathFile, params);
    } else {
      const file = fs.readFileSync(fromPathFile);
      let fileStr = file.toString();

      if (fileCallback instanceof Function) {
        fileStr = fileCallback({
          fileStr,
          file,
          fromPathFile,
          toPathFile,
        });
      }

      fs.writeFileSync(toPathFile, fileStr);
    }
  });
};

module.exports = {
  cloneDir,
};
