const { defineConfig } = require("cypress");
/**
*@type {Cypress.PluginConfig}
*/
const fs = require('fs-extra');
const path = require('path');

function getConfigurationByFile(file){
  const pathToConfigFile = path.resolve('.', 'cypress/config', `${file}.json`);
  return fs.readJson(pathToConfigFile);
}

module.exports = defineConfig({
  env:{
    api_trello: 'https://api.trello.com'
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      // setando o ambiente para homologacao
      const file = config.env.confiFile || 'hml';
      return getConfigurationByFile(file);
    },
  },
});
