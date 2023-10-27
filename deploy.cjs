const FtpDeploy = require("ftp-deploy");
const ftpDeploy = new FtpDeploy();
const auth = require("./ftpauth.json")
const pkg = require("./package.json")

const config = {
    user: auth.keycdn.username,
    password: auth.keycdn.password,
    host: auth.keycdn.host,
    port: auth.keycdn.port,
    localRoot: __dirname + "/build",
    remoteRoot: `/${pkg.version}/`,
    include: ["*.*"],
    exclude: [],
    deleteRemote: false,
    forcePasv: true,
    sftp: false,
};

ftpDeploy
    .deploy(config)
    .then((res) => console.log("finished:", res))
    .catch((err) => console.log(err));