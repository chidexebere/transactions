describe('<App />', () => {
  it('display, sort and show total of table data', () => {
    // Display Expenses table data
    cy.visit('http://localhost:3000');
    cy.get('[data-testid="view-grouped-data"]').click();
    cy.contains('Expenses');

    // Sort Expenses table data

    // Display Group table data
    cy.get('[data-testid="back-to-expenses"]').click();

    // Display total of Group table data
  });
});
