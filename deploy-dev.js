import FtpDeploy from "ftp-deploy"
import auth from "./ftpauth.json" with {type: "json"}
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const ftpDeploy = new FtpDeploy();

const config = {
    user: auth.keycdn.username,
    password: auth.keycdn.password,
    host: auth.keycdn.host,
    port: auth.keycdn.port,
    localRoot: __dirname + "/lib",
    remoteRoot: `/dev/`,
    include: ["*.*"],
    exclude: [],
    deleteRemote: true,
    forcePasv: true,
    sftp: false,
};

ftpDeploy.on("uploading", function (data) {
    console.log(data.filename); // partial path with filename being uploaded
});

ftpDeploy
    .deploy(config)
    .then((res) => console.log("Deploy finished"))
    .catch((err) => console.log(err));
