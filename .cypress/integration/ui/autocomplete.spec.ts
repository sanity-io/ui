context('Components/Autocomplete', () => {
  it('should use key arrows', async () => {
    cy.visit('http://localhost:9009/iframe.html?id=components-autocomplete--custom&viewMode=story')

    cy.get('#custom').click()

    // Search for "nor"
    cy.get('#custom').type('nor')

    // The listbox is expanded
    cy.get('#custom[aria-expanded="true"]').should('exist')
    cy.get('#custom-listbox').should('exist')

    // Arrow down 3 times
    cy.get('#custom-listbox').realPress('ArrowDown')
    cy.get('#custom-listbox').realPress('ArrowDown')
    cy.get('#custom-listbox').realPress('ArrowDown')

    // The 3rd option should be focused
    cy.get('[data-qa="option-NO"]').should('have.focus')

    // Escape to close listbox and clear input
    cy.get('[data-qa="option-NO"]').realPress('Escape')
    cy.get('#custom[aria-expanded="false"][value=""]').should('exist')
  })

  it('should press clear button to clear', async () => {
    cy.visit('http://localhost:9009/iframe.html?id=components-autocomplete--custom&viewMode=story')

    cy.get('#custom').click()

    // Search for "nor"
    cy.get('#custom').type('nor')

    // Arrow down 3 times
    cy.get('#custom-listbox').realPress('ArrowDown')
    cy.get('#custom-listbox').realPress('ArrowDown')
    cy.get('#custom-listbox').realPress('ArrowDown')

    // Enter to select
    cy.get('[data-qa="option-NO"]').should('have.focus').realPress('{enter}')

    // Tab 1 time
    cy.get('#custom').should('have.focus').realPress('Tab')

    // Enter to clear
    cy.get('[data-qa="clear-button"]').should('be.focused')
    cy.get('[data-qa="clear-button"]').click()

    // The input should be empty and focused
    cy.get('#custom[value=""]').should('be.focused')
  })

  it('should collapse when tabbing out', async () => {
    cy.visit('http://localhost:9009/iframe.html?id=components-autocomplete--custom&viewMode=story')

    // Click to focus
    cy.get('#custom').click()

    // Search for "nor"
    cy.get('#custom:focus').type('nor')

    // Tab 1 time
    cy.get('#custom[aria-expanded="true"]').should('have.focus').realPress('Tab')

    // Should be collapsed
    cy.get('#custom[aria-expanded="false"]').should('exist')
  })
})
