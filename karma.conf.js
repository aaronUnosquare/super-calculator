// Karma configuration file
// Documentation: https://karma-runner.github.io/latest/config/configuration-file.html
module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      jasmine: {},
      clearContext: false // leave the Jasmine spec runner output visible in the browser
    },
    jasmineHtmlReporter: {
      suppressAll: true // removes duplicated traces
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/super-calculator'),
      subdir: '.',
      reporters: [
        { type: 'html' },        // generates an HTML report in /coverage
        { type: 'text-summary' } // prints a summary in the terminal
      ]
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,         // set to true in CI environments
    restartOnFileChange: true
  });
};
