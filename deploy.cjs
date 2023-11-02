const FtpDeploy = require("ftp-deploy");
const ftp = new FtpDeploy();
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

const run = async () => {
    let result

    result = await ftp.deploy(configVer)
    console.log(result)
    result = await ftp.deploy(configCurrent)
    console.log(result)
}

run()

