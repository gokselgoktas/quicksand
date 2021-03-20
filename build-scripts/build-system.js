const path = require('path');
const webpack = require('webpack');

const { merge } = require('webpack-merge');
const { program, Option } = require('commander');

program.version('0.0.1');

const target = new Option('-t, --target <target>', 'set target platform')
    .choices(['desktop', 'web'])
    .default('web');

const variant = new Option('-v, --variant <target>', 'set build variant')
    .choices(['development', 'production'])
    .default('development');

program
    .command('compile')
    .alias('c')

    .description('compile project sources')

    .addOption(target)
    .addOption(variant)

    .action((options) => {
        let backEndConfiguration = require(`./${options.variant}/${options.target}-back-end-configuration`);
        let frontEndConfiguration = require(`./${options.variant}/${options.target}-front-end-configuration`);

        const definitions = new webpack.DefinePlugin({
            TARGET: `${options.target}`,
            VARIANT: `${options.variant}`,
        });

        backEndConfiguration = merge(backEndConfiguration, {
            plugins: [
                definitions,
            ],
        });

        frontEndConfiguration = merge(frontEndConfiguration, {
            plugins: [
                definitions,
            ],
        });

        if (options.target === 'desktop') {
            frontEndConfiguration.plugins.shift();
        }

        const environment = new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(options.variant),
            },
        });

        backEndConfiguration.plugins.push(environment);
        frontEndConfiguration.plugins.push(environment);

        const compiler = webpack([
            backEndConfiguration,
            frontEndConfiguration,
        ]);

        compiler.run((error, statistics) => {
            if (error != null) {
                console.error(error.stack || error);

                if (error.details != null) {
                    console.error(error.details);
                }

                return;
            }

            const json = statistics.toJson('minimal');

            if (statistics.hasErrors() === true) {
                console.error(json.errors);
            }

            if (statistics.hasWarnings() === true) {
                console.warn(json.warnings);
            }
        });
    });

program.parse(process.argv);

