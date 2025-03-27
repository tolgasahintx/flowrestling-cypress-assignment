# Cypress Test Automation Assignment: 2025 EIWA Championship Page
## Introduction
This project uses [Cypress](https://www.cypress.io/) for acceptance testing. Cypress is a next generation front end testing tool built for testing modern web applications.
It includes custom commands to enhance the default Cypress functionality and ensure robust and reliable tests.
For more information about Cypress please visit [Cypress Documentation](https://docs.cypress.io/guides/overview/why-cypress).

## Installation
Cypress is included as a dependency in the package.json file. To install all dependencies, including Cypress, use the following command:
`npm ci`

## Configuration
We have a single configuration file([cypress.config.ts](cypress.config.ts)) that contains configuration options for Cypress, such as the base URLs,
test file patterns, retry options and custom command timeouts.

## Running Tests
Custom commands are defined in [package.json](package.json) file to open and run cypress against different environments.
These commands should be run with `npm run` pre-commands as in the examples below.  
`npm run cypress:open` : Opens Cypress GUI mode  
`npm run cypress:run` : Runs tests in headless mode

For debugging and troubleshooting, refer to the [Cypress Debugging Guide](https://docs.cypress.io/guides/guides/debugging)



