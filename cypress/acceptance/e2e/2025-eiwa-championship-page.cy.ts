import { EventsPage } from "../../pages/events-page";

// Test suite for verifying the core UI functionality of the 2025 EIWA Championship event page
describe("2025 EIWA Championship Page UI Tests", () => {
	// Instantiate the page object for reusability
	const eventsPage = new EventsPage();

	beforeEach(() => {
		// Block known third-party scripts that may slow down or break test execution
		cy.stubThirdPartyRequests();

		// Visit the event homepage before each test
		eventsPage.visitHomePage();
	});

	it("Verify the page loads correctly", () => {
		// Check that the page title and banner match the expected event
		cy.title().should("contain", "2025 EIWA Championship");
		eventsPage.getHeaderTitle().should("contain.text", "2025 EIWA Championship");
		eventsPage.getHeaderSummary().should("contain.text", "Mar 7-8");
	});

	it("Verify key navigation links", () => {
		// Click on 'Videos' tab and verify URL and content gets updated
		eventsPage.clickTab(EventsPage.TABS.VIDEOS);
		cy.url().should("include", `/${EventsPage.TABS.VIDEOS.toLowerCase()}`);
		eventsPage.getMainContentHeader().should("contain.text", EventsPage.TABS.VIDEOS);

		// Click on 'News' tab and verify URL and content gets updated
		eventsPage.clickTab(EventsPage.TABS.NEWS);
		cy.url().should("include", `/${EventsPage.TABS.NEWS.toLowerCase()}`);
		eventsPage.getMainContentHeader().should("contain.text", EventsPage.TABS.NEWS);

		// Click on 'Schedule' tab and verify URL and content gets updated
		eventsPage.clickTab(EventsPage.TABS.SCHEDULE);
		cy.url().should("include", `/${EventsPage.TABS.SCHEDULE.toLowerCase()}`);
		eventsPage.getMainContentHeader().should("contain.text", EventsPage.TABS.SCHEDULE);

		// Click on 'Results' tab and verify URL and content gets updated
		eventsPage.clickTab(EventsPage.TABS.RESULTS);
		cy.url().should("include", `/${EventsPage.TABS.RESULTS.toLowerCase()}`);
		eventsPage.getMainContentHeader().should("contain.text", EventsPage.TABS.RESULTS)
	});

	it("Test filtering by team", () => {
		// Apply 'Hofstra' team name filter via the dropdown (index 1)
		eventsPage.openDropdown(1);
		eventsPage.selectDropdownOption("Hofstra");

		// Verify each result card includes "Hofstra"
		eventsPage.getResultCards().each(($el) => {
			expect($el.text()).to.include("Hofstra");
		});

		// Confirm the filter is reflected in the decoded URL
		cy.expectDecodedUrlToInclude('"teamName":"Hofstra"');
	});

	it("Test filtering by weight class", () => {
		// Apply '125 lbs' weight class filter via the dropdown (index 2)
		eventsPage.openDropdown(2);
		eventsPage.selectDropdownOption("125 lbs");

		// Verify all match replays are for "125 lbs"
		eventsPage.getReplayCaptions().each(($el) => {
			expect($el.text()).to.include("125 lbs");
		});

		// Assert filter appears in URL in decoded form
		cy.expectDecodedUrlToInclude('"weightClassName":"125 lbs"');
	});

	it("Test filtering by round", () => {
		// Apply 'Finals' round filter via dropdown (index 0)
		eventsPage.openDropdown(0);
		eventsPage.selectDropdownOption("Finals");

		// Validate UI reflects correct round count and title and expected number of results
		cy.get(".flo-container flo-slim-header h2").should("have.length", 1).and("have.text", "Finals");
		eventsPage.getResultCards().should("have.length", 5);

		// Assert filter appears in URL in decoded form
		cy.expectDecodedUrlToInclude('"roundName":"Finals"');
	});

	it("Test resetting filters", () => {
		// Apply multiple filters: round, team, and weight class
		eventsPage.openDropdown(0);
		eventsPage.selectDropdownOption("Finals");
		eventsPage.openDropdown(1);
		eventsPage.selectDropdownOption("Hofstra");
		eventsPage.openDropdown(2);
		eventsPage.selectDropdownOption("165 lbs");

		// Click "Clear All" and verify that the search page is displayed
		eventsPage.getClearAllButton().should("contain.text", "Clear All").click();
		cy.url().should("include", "search");
	});

	it("Test search input", () => {
		// Intercept the search API call triggered by typing into the search box
		cy.intercept("GET", "**search=dominic**").as("loadSearchResults");

		// Type a search query and wait for results to load
		eventsPage.getSearchInput().clear().type("dominic");
		cy.wait("@loadSearchResults");

		// Verify that at least one competitor name includes 'dominic' in each result card
		eventsPage.getResultCards().each(($card) => {
			const nameEls = $card.find('.w-competitor-detail__name');
			const hasDominic = [...nameEls].some((el) =>
				el.innerText.toLowerCase().includes("dominic")
			);
			expect(hasDominic, 'at least one competitor name includes "dominic"').to.be.true;
		});
	});

	it("Test no results behavior", () => {
		const randomName = "mywrestler";
		// Enter a random name that should return no results
		eventsPage.getSearchInput().type(randomName);

		// Verify the 'no results' message appears searched name
		eventsPage.getNoResultsMessage().should(
			"have.text",
			`We couldn't find any results for"${randomName}"Check your spelling, try different keywords, or adjust your filters.`
		);
	});
});
