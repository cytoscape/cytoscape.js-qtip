// meteor package.js definition

var packageJson = JSON.parse(Npm.require("fs").readFileSync('package.json'));

Package.describe({
  name: 'maxkfranz:cytoscape-qtip',
  version: packageJson.version,
  summary: packageJson.description,
  git: packageJson.repository.url,
  documentation: 'README.md'
});

Package.onUse(function(api) {  
  api.use('jquery@1.11.0');
  api.use('maxkfranz:cytoscape@2.4.0');
  
  api.addFiles([
    'cytoscape-qtip.js'
  ]);
});

Package.onTest(function(api) {
  api.use('jquery');
  api.use('maxkfranz:cytoscape');
  api.use('maxkfranz:cytoscape-qtip');
  api.use('tinytest');
  
  // define your test files here if you like
  // api.addFiles('test-meteor.js');
});
