/// <reference types="cypress" />
// Lodash is bundled with Cypress
// https://on.cypress.io/bundled-tools
const { _ } = Cypress;

describe('<App />', () => {
  beforeEach(() => {
    // We intercept the request, and we return with the response
    cy.intercept(
      'https://raw.githubusercontent.com/Pectus-Finance/hiring-exercises/master/frontend/expanses.csv',
    ).as('tableData');
    cy.visit('http://localhost:3000');
    // We wait for the response
    cy.wait(1000);
  });

  it('display View Grouped Data button, expense table, and sort table data by clicking on each table header', () => {
    // Display Expenses table data
    cy.get('button[data-testid="view-grouped-data"]').should(
      'have.text',
      'View Grouped Data',
    );
    cy.get('table')
      .should('contain', 'Expenses')
      .within(() => {
        // limit query commands to the found element
        cy.get('tr').should('have.length', 150);

        // Sort Expenses table data by departments
        cy.log('**sort by departments in ascending order**');
        cy.contains('button', 'Departments').click();

        // check ▲ is visible
        cy.contains('button', 'Departments')
          .find('[data-testid="sort-icon"]')
          .should('contain', '▲');

        // verify the departments in the column are indeed in sorted order
        const ascStrings = (cells$: JQuery<HTMLElement>) =>
          _.map(cells$, 'textContent');

        cy.get('#departments')
          .then(ascStrings)
          .then((departments) => {
            // confirm departments are sorted
            // by sorting them ourselves
            // and comparing with the input list
            const sorted = _.sortBy(departments);

            expect(departments).to.deep.equal(sorted);
          });

        cy.log('**sort by departments in descending order**');
        cy.contains('button', 'Departments').click();

        // check ▼ is visible
        cy.contains('button', 'Departments')
          .find('[data-testid="sort-icon"]')
          .should('contain', '▼');

        const descStrings = (cells$: JQuery<HTMLElement>) =>
          _.map(cells$, 'textContent');

        cy.get('#departments')
          .then(descStrings)
          .then((departments) => {
            const sorted = _.orderBy(departments, 'desc');

            expect(departments).to.deep.equal(sorted);
          });
      });
  });

  it('display Back to Expenses button, Select compoment, Group expense table, perform filtering and sorting', () => {
    // Display Group Expenses table data when View group data button is clicked
    cy.get('button[data-testid="view-grouped-data"]').click();

    cy.get('button[data-testid="back-to-expenses"]').should(
      'have.text',
      'Back to Expenses',
    );

    cy.get('table')
      .should('contain', 'Grouped Expenses')
      .within(() => {
        // limit query commands to the found element
        cy.get('tr').should('have.length', 7); // non-header rows

        // Sort Group Expenses table data by departments
        cy.log('**sort by departments in ascending order**');
        cy.contains('button', 'Departments').click();

        // check ▲ is visible
        cy.contains('button', 'Departments')
          .find('[data-testid="sort-icon"]')
          .should('contain', '▲');

        // verify the departments in the column are indeed in sorted order
        const ascStrings = (cells$: JQuery<HTMLElement>) =>
          _.map(cells$, 'textContent');

        cy.get('#departments')
          .then(ascStrings)
          .then((departments) => {
            const sorted = _.sortBy(departments);

            expect(departments).to.deep.equal(sorted);
          });

        cy.log('**sort by departments in descending order**');
        cy.contains('button', 'Departments').click();

        // check ▼ is visible
        cy.contains('button', 'Departments')
          .find('[data-testid="sort-icon"]')
          .should('contain', '▼');

        const descStrings = (cells$: JQuery<HTMLElement>) =>
          _.map(cells$, 'textContent');

        cy.get('#departments')
          .then(descStrings)
          .then((departments) => {
            const sorted = _.orderBy(departments, 'desc');

            expect(departments).to.deep.equal(sorted);
          });
      });

    cy.get('form')
      .should('contain', 'Total Expenses by:')
      .within(() => {
        // select option should be Departments by default
        cy.get('select').select(0).should('have.value', 'departments');
      });

    // Test Filter by selecting option name
    cy.get('select').select('Name');

    cy.get('table').within(() => {
      cy.get('th').should('contain', 'Name');
    });

    // Display total of Group table data
    cy.get('table').within(() => {
      cy.get('#totalValue').should('be.visible');
    });
  });

  it('display each table once respective buttons are clicked', () => {
    // Display Group Expenses table data when View group data button is clicked
    cy.get('button[data-testid="view-grouped-data"]').click();

    cy.get('button[data-testid="back-to-expenses"]').should(
      'have.text',
      'Back to Expenses',
    );
    cy.get('table').should('contain', 'Grouped Expenses');

    // Display Expenses table data when back to expenses button is clicked
    cy.get('button[data-testid="back-to-expenses"]').click();

    cy.get('button[data-testid="view-grouped-data"]').should(
      'have.text',
      'View Grouped Data',
    );
    cy.get('table').should('contain', 'Expenses');
  });
});
