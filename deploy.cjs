const FtpDeploy = require("ftp-deploy");
const ftpDeploy = new FtpDeploy();
const auth = require("./ftpauth.json")
const pkg = require("./package.json")

const configVer = {
    user: auth.keycdn.username,
    password: auth.keycdn.password,
    host: auth.keycdn.host,
    port: auth.keycdn.port,
    localRoot: __dirname + "/build",
    remoteRoot: `/${pkg.version}/`,
    include: ["*.*"],
    exclude: [],
    deleteRemote: true,
    forcePasv: true,
    sftp: false,
};

const configCurrent = {
    user: auth.keycdn.username,
    password: auth.keycdn.password,
    host: auth.keycdn.host,
    port: auth.keycdn.port,
    localRoot: __dirname + "/build",
    remoteRoot: `/current/`,
    include: ["*.*"],
    exclude: [],
    deleteRemote: true,
    forcePasv: true,
    sftp: false,
};

ftpDeploy
    .deploy(configVer)
    .then((res) => console.log("finished:", res))
    .catch((err) => console.log(err));

ftpDeploy
    .deploy(configCurrent)
    .then((res) => console.log("finished:", res))
    .catch((err) => console.log(err));

