const appConfig = {
  /**
   * Properties used to control settings of Cells Bridge and the build process
   */
  cells_properties: {
    enableLitElement: true,
    onlyLitElements: true,
    initialTemplate: 'goal',
    transpile: true,
    transpileExclude: ['webcomponentsjs', 'moment', 'd3', 'bgadp*'],
    buildTargets:[
      'last 5 Chrome versions',
      'last 8 Android versions',
      'last 8 Safari versions'
    ],
    debug: true,
    logs: false,

    /**
     * Relative path to folder that contains dynamic pages (.json files)
     */
    templatesPath: './dynamicPages/',
    /**
     * Relative path to folder that contains static pages (.js files)
     */
    pagesPath: './pages/',
    prplLevel: 1,
    initialBundle: [ 'login' ],

    /* Internationalization options */
    locales: {
      languages: [],
      intlInputFileNames: [ 'locales' ],
      intlFileName: 'locales',
    }
  },

  /**
   * These properties are specific to your application.
   * Here you can use your own properties, so it is an
   * open set of properties that you can use at your
   * convenience.
   * These variables will be available in your
   * application ins the window.AppConfig object
   */
  app_properties: {
    mock: true,
  },
};

module.exports = appConfig;
