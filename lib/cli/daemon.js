'use strict';

var program = require('commander');
var path = require('path');
var alterdot = require('..');

function main(servicesPath, additionalServices) {
  /* jshint maxstatements: 100 */

  var version = alterdot.version;
  var start = alterdot.scaffold.start;
  var findConfig = alterdot.scaffold.findConfig;
  var defaultConfig = alterdot.scaffold.defaultConfig;

  program
    .version(version)
    .description('Start the current node')
    .option('-c, --config <dir>', 'Specify the directory with Alterdot Node configuration')
    .option('-d, --daemon', 'Make alterdot a daemon (running in the background)');

  program.parse(process.argv);

  if (program.config) {
    program.config = path.resolve(process.cwd(), program.config);
  }
  var configInfo = findConfig(program.config || process.cwd());
  if (!configInfo) {
    configInfo = defaultConfig({
      additionalServices: additionalServices
    });
  }
  if(program.daemon) {
    configInfo.config.daemon = true;
  }
  if (servicesPath) {
    configInfo.servicesPath = servicesPath;
  }
  start(configInfo);
}

module.exports = main;
