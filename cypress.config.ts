import { defineConfig } from 'cypress'

export default defineConfig({
	chromeWebSecurity: false,
	defaultCommandTimeout: 60000, // to wait until most DOM based commands are considered timed out.
	pageLoadTimeout: 60000, // to wait for page transition events or cy.visit(), cy.go(), cy.reload() commands to fire their page load events.
	requestTimeout: 30000, // to wait for a request to go out in a cy.wait() command.
	responseTimeout: 30000, // to wait until a response in a cy.request(), cy.wait(), cy.fixture(), etc.
	viewportWidth: 1800,
	viewportHeight: 1000,
	env: {
		APIBaseUrl: '', // placeholder for the base API URL.
	},
	retries: {
		runMode: 3,
		openMode: 0, // we don't want to retry the tests in when running in Cypress GUI
	},
	video: true, // need this because video recording is disabled by default in Cypress 13
	videoCompression: false,
	e2e: {
		specPattern: "cypress/acceptance/**/*.cy.{js,jsx,ts,tsx}",
		async setupNodeEvents(on, config) {
			return config;
		},
		baseUrl: 'https://www.flowrestling.org',
	},
})
