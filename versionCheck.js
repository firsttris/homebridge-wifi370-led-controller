const path = require('path');
const fs = require('fs');

class VersionCheck {
    constructor () {
    }

    static getLocalVersion () {
        const packageJsonPath = path.join(__dirname, './package.json');
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath));
        return packageJson.version;
    }

    static getNpmVersion (packageName, callback) {
        let exec = require('child_process').exec;
        const cmd = 'npm view ' + packageName + ' version';
        exec(cmd, function (error, stdout, stderr) {
            let npm_version = stdout;
            npm_version = npm_version.replace('\n', '');
            callback(npm_version);
        });
    }

    static checkForUpdate(packageName, autoupdate, log) {
        this.getNpmVersion(packageName, (npmVersion) => {
            npmVersion = npmVersion.replace('\n', '');
            log.info("Version Check => NPM Version: %s vs Local Version: %s", npmVersion, this.getLocalVersion());
            if (npmVersion > this.getLocalVersion()) {
                if (autoupdate) {
                    const cmd = "sudo npm -g update "+packageName;
                    let exec = require('child_process').exec;
                    log.info("There is a new version. Autoupdate is set to %s, updating now .. this may take some seconds.", autoupdate);
                    exec(cmd, function (error, stdout, stderr) {
                        if (!error) {
                            log.warn("A new version was installed recently. Please restart the homebridge process to complete the update");
                            log.warn("Message from updater %s", stdout);
                        } else {
                            log.error("Error while updating.");
                        }
                    });
                } else {
                    log.warn("There is a new Version available. Please update with sudo npm -g update "+packageName);
                }
            }
        });
    }


}

module.exports = VersionCheck;