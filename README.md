# What's this project about?

This project is an application created using Cells for the Meraki seedbed.

## What has it got?

- It showcases the minimal sample application built with [LitElement](https://lit.dev/) and declarative pages, using our latest stack (Cells Cli 4.0 & Cells Bridge).

- Built entirely with components from [Cells Catalog](https://au-bbva-andromeda.appspot.com/api/projects/au-bbva-cells-platform/segments/au-bbva-cells-artefacts/resources/cells/apps/bbva_gl_catalog/cells-catalog/master/cellsapp/pr/vulcanize/index.html#!/) - BBVA Experience & Cells Architecture.

- If the application was created with the e2e option it will have a scaffold for testing e2e with Cells Pepino V2 ([WebdriverIO 6.0](https://v6.webdriver.io/)) and [Global QE Testing Framework](https://globaldevtools.bbva.com/bitbucket/projects/BGT/repos/e2e-js-framework/browse), that will serve as a starting point for your requirements and custom use cases.

To go deeper, please check our [Platform Documentation](https://platform.bbva.com/en-us/developers/engines/cells/documentation/getting-started/what-is-cells).


# CELLS (**cells-cli**)

**cells-cli** is the command line tool that provides you with common tasks and commands for working in a cells project.

## Installation

To install the application just run:

~~~sh
npm -g install @cells/cells-cli
~~~

Once installed, `cells` command will be available to you.

## Usage

* Starting the application in dev mode

~~~
$ cells app:serve -c dev.js
~~~

* Starting the application in production mode

~~~
$ cells app:serve -c dev.js -b
~~~


## <a name="e2e"></a>Testing e2e

If you want to run e2e tests with [Cells Pepino V2](https://platform.bbva.com/en-us/developers/engines/cells/documentation/testing/cells-pepino-v2), you must install it. Go to folder `test/e2e`, install dependencies and then, execute it from the root of your e2e project.

#### Installation (inside your e2e test project)

```shell
yarn
```

#### Execution (from the root of your e2e project)

```shell
./node_modules/@cells-pepino/cli/bin/cli.js -c ./config/wdio5.local.conf.js
```

or simply, through provided npm script in e2e scaffold project:

```shell
npm run test
```

Follow given documentation, and e2e project README.md file for more information about how to do it (the file is located in the folder `test/e2e`).

__If you are going to run your e2e tests against a local application (you are hosting it in your local workspace), remember to serve it first__ - otherwise e2e test runner won't be able to run the tests against it - See more information about `cells app:serve` command above.

__REMEMBER! You must install all required npm dependencies first inside your E2E project__

```shell
yarn
```

Parameters:

- **url**: url for testing. Required
- **config_file**: javascript configuration file. This configuration must exists in the path `./app/config/{environment}.js`. Required.

**WARNING:**

To run the test yo must move on a e2e folder project. You can create it answer `Y' to the question
`Do you want an E2E project to be created? (Y/n)` in the creation app process.
See `cells app:create --help`.