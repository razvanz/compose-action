const core = require("@actions/core");
const fs = require("fs");

module.exports.parseInput = (input) => {
  if (input != null && typeof input == "string" && input.length > 0) {
    return input.split(" ");
  }

  return [];
}

module.exports.getDockerComposeFilePaths = () => {
  return module.exports.parseInput(core.getInput("compose-file"))
    .map(f => {
      if (!fs.existsSync(f)) throw new Error(`${f} not exists`);

      return f;
    });
}
