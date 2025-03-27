// ***********************************************
// This file contains custom commands
// designed for use in test files.
// For detailed information on custom
// commands, visit: https://on.cypress.io/custom-commands

/**
 * Stubs out known third-party tracking and analytics requests that are not essential
 * for application functionality but often interfere with Cypress test stability.
 *
 * Many of these third-party scripts (e.g., ad networks, analytics, tracking pixels)
 * are slow to load, redirect endlessly,
 * which can cause Cypress to:
 *  - Hang on cy.visit() due to delayed page load events
 *  - Fail tests unexpectedly due to external script errors
 *
 * This command ensures that:
 *  - Tests run faster and more reliably
 *  - Only the application's behavior is tested, not external dependencies
 *  - Console noise and irrelevant failures are minimized
 *
 * Usage:
 *   Call cy.stubThirdPartyRequests() in a beforeEach() hook to apply it across tests.
 */

Cypress.Commands.add("stubThirdPartyRequests", () => {
	const stubbedPatterns = [
		/.*\.doubleclick\.net.*/i,
		/.*\.pubmatic\.com.*/i,
		/.*\.quantserve\.com.*/i,
		/.*\.clarity\.ms.*/i,
		/.*\.facebook\.net.*/i,
		/.*\.scorecardresearch\.com.*/i,
		/.*\.segment\.com.*/i,
		/.*\.rubiconproject\.com.*/i,
		/.*\.osano\.com.*/i,
		/.*\.tremorhub\.com.*/i,
		/.*\.redfastlabs\.com.*/i,
		/.*\.crwdcntrl\.net.*/i,
		/.*\.impactcdn\.com.*/i,
		/.*\.chartbeat\.com.*/i,
		/.*\.bat\.bing\.com.*/i,
		/.*\.33across\.com.*/i,
		/.*\.fastclick\.net.*/i,
		/.*\.quantcount\.com.*/i,
		/.*\.adnxs\.com.*/i,
		/.*\.rfihub\.net.*/i,
		/.*\.privacy\-manager\.io.*/i,
	];

	stubbedPatterns.forEach((pattern, index) => {
		cy.intercept({ url: pattern }, { statusCode: 200, body: '' }).as(`stubbed${index}`);
	});

	Cypress.on('uncaught:exception', () => false);
});

Cypress.Commands.add("expectDecodedUrlToInclude", (expected: string) => {
	cy.url().then((url) => {
		const decodedUrl = decodeURIComponent(url);
		expect(decodedUrl).to.include(expected);
	});
});

