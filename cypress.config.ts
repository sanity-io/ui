/// <reference types="cypress" />

const config: Cypress.ConfigOptions = {
  e2e: {
    baseUrl: 'http://localhost:1337',
  },
}

export default config
