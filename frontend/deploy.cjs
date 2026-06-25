const FtpDeploy = require("ftp-deploy");
const ftpDeploy = new FtpDeploy();

const config = {
  user: "your-ftp-username",
  password: "your-ftp-password",
  host: "ftp.bisharod.com",
  port: 21,
  localRoot: __dirname + "/dist",
  remoteRoot: "/public_html/",
  include: ["*", "**/*"],
  deleteRemote: true, // removes stale files not in this build
  forcePasv: true,
};

ftpDeploy
  .deploy(config)
  .then((res) => console.log("Deploy finished:", res))
  .catch((err) => console.error(err));