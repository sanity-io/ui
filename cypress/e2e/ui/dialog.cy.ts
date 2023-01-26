context('Components/Dialog', () => {
  it('should open dialog', () => {
    cy.visit('/frame/?path=/components/dialog/props')

    cy.get('#open-dialog-button').click()
    cy.get('#dialog').should('be.visible')
  })

  it('should trap focus', () => {
    cy.visit('/frame/?path=/components/dialog/props')

    // Press enter to open the dialog
    // cy.get('#open-dialog-button').realPress('{enter}')
    cy.get('#open-dialog-button').click()
    cy.get('#dialog').should('be.visible')

    // The first button should be focused
    cy.get('#dialog button[aria-label="Close dialog"]').should('be.focused')

    // Tab to next until the focus is back at the top
    cy.get('#dialog button[aria-label="Close dialog"]').realPress('Tab')
    cy.get('#button-1').should('be.focused')
    cy.get('#button-1').realPress('Tab')
    cy.get('#button-2').should('be.focused')
    cy.get('#button-2').realPress('Tab')
    cy.get('#button-3').should('be.focused')
    cy.get('#button-3').realPress('Tab')
    cy.get('#button-4').should('be.focused')
    cy.get('#button-4').realPress('Tab')
    cy.get('#button-5').should('be.focused')
    cy.get('#button-5').realPress('Tab')
    cy.get('#dialog button[aria-label="Close dialog"]').should('be.focused')
    cy.get('#dialog button[aria-label="Close dialog"]').realPress('Tab')

    // The first button should again be focused
    cy.get('#button-1').should('be.focused')
  })

  it('should focus last focused element when dialog becomes top layer', () => {
    cy.visit('/frame/?path=/components/dialog/activate')

    // Open the nested dialogs
    cy.get('#open-dialog-1-button').click()
    cy.get('#open-dialog-2-button-2').click()
    cy.get('#open-dialog-3-button-3').click()

    // Close dialogs and check if the last focused element is focused
    cy.realPress('Escape')
    cy.get('#open-dialog-3-button-3').should('be.focused')

    cy.realPress('Escape')
    cy.get('#open-dialog-2-button-2').should('be.focused')

    cy.realPress('Escape')
    cy.get('#open-dialog-1-button').should('be.focused')
  })
})
