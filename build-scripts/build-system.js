const { program, Option } = require('commander');
const { build } = require('electron-builder');

const webpack = require('webpack');

program.version('0.0.1');

const target = new Option('-t, --target <target>', 'set target platform')
    .choices(['electron', 'express'])
    .default('express');

const variant = new Option('-v, --variant <target>', 'set build variant')
    .choices(['development', 'production'])
    .default('development');

function compile(options) {
    const backEndConfiguration = require(`./${options.target}-${options.variant}-back-end-configuration`);
    const frontEndConfiguration = require(`./${options.target}-${options.variant}-front-end-configuration`);

    if (options.target === 'electron') {
        frontEndConfiguration.plugins.shift();
    }

    const environment = new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify(options.variant),
        },
    });

    backEndConfiguration.plugins.push(environment);
    frontEndConfiguration.plugins.push(environment);

    const compiler = webpack([backEndConfiguration, frontEndConfiguration]);

    return new Promise((resolve, reject) => {
        compiler.run((error, statistics) => {
            if (error !== null) {
                console.error(error.stack || error);

                if (error.details !== null) {
                    console.error(error.details);
                }

                reject(new Error('Error in compiler.run'));
                return;
            }

            const json = statistics.toJson('minimal');

            if (statistics.hasErrors() === true) {
                console.error(json.errors);

                reject(new Error('Error in compiler.run statistics'));
                return;
            }

            if (statistics.hasWarnings() === true) {
                console.warn(json.warnings);
            }

            resolve();
        });
    });
}

program
    .command('compile')
    .alias('c')

    .description('compile project sources')

    .addOption(target)
    .addOption(variant)

    .action(compile);

program
    .command('package')
    .alias('p')

    .description('package desktop app')

    .addOption(target)
    .addOption(variant)

    .action(async (options) => {
        await compile({
            target: options.target,
            variant: options.variant,
        });

        const configuration = {
            appId: 'sh.stimhack.quicksand',
            productName: 'Quicksand',

            files: [
                'package.json',
                '!node_modules/**/*',

                {
                    from: `./build/${options.target}/${options.variant}`,
                    to: '.',

                    filter: ['**/*'],
                },
            ],

            directories: {
                buildResources: 'build-resources',
            },

            win: {
                target: 'portable',
            },
        };

        build({
            config: configuration,
        });
    });

program.parse(process.argv);
