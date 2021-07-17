'use strict';
const chalk = require('chalk');
const prompt = require('prompt');
const figlet = require('figlet');

console.log(
    chalk.blueBright(
        figlet.textSync('     HOME-TV   ', { horizontalLayout: 'full' })
    )
);
console.log('Welcome!');

prompt.get([{
    name: 'response',
    message: `Do you want to boot to mini-mode? Answer with 'y' or 'n'`,
    required: true,
    warning: `Values must either be 'yes' or 'no'`,
    conform: function (value) {
        if (value !== '' && (value.toLowerCase() === 'y' || value.toLowerCase() === 'n')) {
            return true;
        }
        return false;
    }
}], function (err, result) {
    if (result.response.toLowerCase() == 'y') {
        console.log('Loading...');
        var fork = require('child_process').fork;
        var child = fork('/home/pi/kiosk.sh');
        process.exit();
    }
    else {
        require('readline')
            .createInterface(process.stdin, process.stdout)
            .question("Press [Enter] to exit...", function () {
                process.exit();
            });
    }
});