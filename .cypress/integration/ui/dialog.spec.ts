context('Components/Dialog', () => {
  it('should open dialog', () => {
    cy.visit('http://localhost:9009/frame/?path=/components/dialog/props')

    cy.get('#open-dialog-button').click()
    cy.get('#dialog').should('be.visible')
  })

  it('should trap focus', () => {
    cy.visit('http://localhost:9009/frame/?path=/components/dialog/props')

    // Press enter to open the dialog
    // cy.get('#open-dialog-button').realPress('{enter}')
    cy.get('#open-dialog-button').click()
    cy.get('#dialog').should('be.visible')

    // The first button should be focused
    cy.get('#button-1').should('be.focused')

    // Tab to next until the focus is back at the top
    cy.get('#button-1').realPress('Tab')
    cy.get('#button-2').should('be.focused')
    cy.get('#button-2').realPress('Tab')
    cy.get('#button-3').should('be.focused')
    cy.get('#button-3').realPress('Tab')
    cy.get('#button-4').should('be.focused')
    cy.get('#button-4').realPress('Tab')
    cy.get('#button-5').should('be.focused')
    cy.get('#button-5').realPress('Tab')
    cy.get('button[aria-label="Close dialog"]').should('be.focused')
    cy.get('button[aria-label="Close dialog"]').realPress('Tab')

    // The first button should again be focused
    cy.get('#button-1').should('be.focused')
  })
})
