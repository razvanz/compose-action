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
  const services = core.getMultilineInput("services", { required: false });

  (services.length > 0 ? compose.upMany(services, options) : compose.upAll(options))
    .then(() => { console.log("compose started"); })
    .catch((err) => { core.setFailed(`compose up failed ${JSON.stringify(err)}`); });
} catch (error) {
  core.setFailed(error.message);
}
