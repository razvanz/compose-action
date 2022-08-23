const core = require("@actions/core");
const compose = require("docker-compose");
const { parseInput, getDockerComposeFilePaths } = require("./utils");

try {
  const options = {
    config: getDockerComposeFilePaths(),
    log: true,
    composeOptions: parseInput(core.getInput("compose-flags")),
    commandOptions: parseInput(core.getInput("up-flags"))
  };

  compose.down(options).then(
    () => { console.log("compose removed"); },
    (err) => { core.setFailed(`compose down failed ${err}`); }
  );
} catch (error) {
  core.setFailed(error.message);
}
