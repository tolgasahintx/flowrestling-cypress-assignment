// This file extends Cypress' Chainable interface to add custom commands for common actions.
// Declared commands should be implemented in "/support/commands.ts" file.
declare namespace Cypress {
	interface Chainable<Subject = any> {
		/**
		 * Custom command to stub/block known third-party tracking and ad network requests
		 * to improve test reliability and prevent Cypress from timing out or failing due to
		 * external script errors, redirects, or long load times.
		 *
		 * This is especially useful when the application under test loads many analytics,
		 * ads, or cookie-consent scripts from external domains that can interfere with
		 * cy.visit(), cy.intercept(), or uncaught exceptions.
		 *
		 * @example
		 *    cy.stubThirdPartyRequests()
		 */
		stubThirdPartyRequests(): Chainable<void>;

		/**
		 * Asserts that the decoded current URL includes a given substring.
		 * Useful when asserting against query params that are JSON-encoded.
		 *
		 * @param expected - The decoded string to expect in the current URL
		 * @example
		 *    cy.expectDecodedUrlToInclude('"teamName":"Hofstra"')
		 */
		expectDecodedUrlToInclude(expected: string): Chainable<void>;
	}
}
