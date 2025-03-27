export class EventsPage {
	static readonly TABS = {
		VIDEOS: "Videos",
		NEWS: "News",
		SCHEDULE: "Schedule",
		RESULTS: "Results",
	};

	visitHomePage() {
		cy.visit("/events/12932757-2025-eiwa-championship");
	}

	getHeaderTitle() {
		return cy.get("[data-test=header-title-desktop]");
	}

	getHeaderSummary() {
		return cy.get("[data-test=header-summary]");
	}

	clickTab(name: string) {
		return cy.get("[data-test=sub-navigation] [data-test=flo-link]").contains(name).click();
	}

	getMainContentHeader() {
		return cy.get("[data-test=entity-hub-main-content] .m-0");
	}

	openDropdown(index: number) {
		return cy.get("[data-test=dropdown]").eq(index).click();
	}

	selectDropdownOption(optionText: string) {
		return cy.get("[data-test=dropdown-option]").contains(optionText).click();
	}

	getResultCards() {
		return cy.get(".w-result-card");
	}

	getReplayCaptions() {
		return cy.get("[data-test=wrestling-match-replay-link] .caption");
	}

	getClearAllButton() {
		return cy.get("[data-test=event-clear-all-filters-bff]");
	}

	getSearchInput() {
		return cy.get("[data-test=search-input]");
	}

	getNoResultsMessage() {
		return cy.get("[data-test=message]");
	}
}
