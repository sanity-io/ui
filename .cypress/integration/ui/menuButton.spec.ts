context('Components/MenuButton', () => {
  it('clicking should open/close menu', () => {
    cy.visit('http://localhost:9009/frame/?path=/components/menu/menu-button')

    // click button
    cy.get('#menu-button').click()
    cy.get('#menu-button[aria-expanded="true"]').should('exist')

    // click outside
    cy.get('#next-button').click()
    cy.get('#menu-button[aria-expanded="false"]').should('exist')
  })

  it('should use arrow keys to navigate the menu', () => {
    cy.visit('http://localhost:9009/frame/?path=/components/menu/menu-button')

    // Open menu by pressed DOWN arrow key
    cy.get('#menu-button').focus().realPress('ArrowDown')
    cy.get('#menu-item-1:focus').should('be.focused')

    // Move through menu with arrow keys
    cy.get('#menu-item-1').realPress('ArrowDown')
    cy.get('#menu-item-2:focus').should('be.focused')

    cy.get('#menu-item-2').realPress('ArrowDown')
    // Skips #menu-item-3, because it's disabled
    cy.get('#menu-item-4:focus').should('be.focused')
    cy.get('#menu-item-4').realPress('ArrowDown')
    // The first menu item should now be focused
    cy.get('#menu-item-1:focus').should('be.focused')
    // Escape to exit the menu
    cy.get('#menu-item-1').realPress('Escape')
    cy.get('#menu-button').should('be.focused')

    // Open menu by pressed UP arrow key
    cy.get('#menu-button').realPress('ArrowUp')
    cy.get('#menu-item-4:focus').should('be.focused')
    // Move through menu with arrow keys
    cy.get('#menu-item-4').realPress('ArrowUp')
    // Skips #menu-item-3, because it's disabled
    cy.get('#menu-item-2:focus').should('be.focused')
    cy.get('#menu-item-2').realPress('ArrowUp')
    cy.get('#menu-item-1:focus').should('be.focused')
    cy.get('#menu-item-1').realPress('ArrowUp')
    // The last menu item should now be focused
    cy.get('#menu-item-4:focus').should('be.focused')
    // Escape to exit the menu
    cy.get('#menu-item-4').realPress('Escape')
    cy.get('#menu-button').should('be.focused')
  })

  it('should close on tab', () => {
    cy.visit('http://localhost:9009/frame/?path=/components/menu/menu-button')

    cy.get('#menu-button').focus().realPress('ArrowDown')
    cy.get('#menu-item-1').should('be.focused')
    cy.get('#menu-item-1').realPress('Tab')
    cy.get('#menu-button[aria-expanded="true"]').should('not.exist')
    cy.get('#next-button').should('be.focused')
  })

  it('should close on shift + tab', () => {
    cy.visit('http://localhost:9009/frame/?path=/components/menu/menu-button')

    cy.get('#menu-button').focus().realPress('ArrowDown')
    cy.get('#menu-item-1').should('be.focused')
    cy.get('#menu-item-1').realPress(['Shift', 'Tab'])
    cy.get('#menu-button[aria-expanded="true"]').should('not.exist')
    cy.get('#prev-button').should('be.focused')
  })

  it('should not close when one of the items receives focus', () => {
    cy.visit('http://localhost:9009/frame/?path=/components/menu/menu-button')

    cy.get('#menu-button').click()
    cy.get('#menu-button').should('be.focused')
    cy.get('#menu-item-2').focus()
    cy.get('#menu-button[aria-expanded="true"]').should('exist')
  })
})
