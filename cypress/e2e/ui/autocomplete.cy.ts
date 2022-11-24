const RE_RESIZE_OBSERVER_LOOP_ERROR = /ResizeObserver loop limit exceeded/

context('Components/Autocomplete', () => {
  it('should use key arrows', () => {
    cy.on('uncaught:exception', (err) => !RE_RESIZE_OBSERVER_LOOP_ERROR.test(err.message))

    cy.visit('/frame/?path=/components/autocomplete/custom')

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

  it('should press clear button to clear', () => {
    cy.on('uncaught:exception', (err) => !RE_RESIZE_OBSERVER_LOOP_ERROR.test(err.message))

    cy.visit('/frame/?path=/components/autocomplete/custom')

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

  it('should collapse when tabbing out', () => {
    cy.on('uncaught:exception', (err) => !RE_RESIZE_OBSERVER_LOOP_ERROR.test(err.message))

    cy.visit('/frame/?path=/components/autocomplete/custom')

    // Click to focus
    cy.get('#custom').click()

    // Search for "nor"
    cy.get('#custom:focus').type('nor')

    // Tab 1 time
    cy.get('#custom[aria-expanded="true"]').should('have.focus')

    // Focus the next focusable element
    cy.get('#set-value-btn').focus()

    // Should be collapsed
    cy.get('#custom[aria-expanded="false"]').should('exist')
  })

  it('should clear query on blur', () => {
    cy.on('uncaught:exception', (err) => !RE_RESIZE_OBSERVER_LOOP_ERROR.test(err.message))

    cy.visit('/frame/?path=/components/autocomplete/custom')

    // Click to focus
    cy.get('#custom').click()

    // Search for "nor"
    cy.get('#custom').type('nor')

    // Arrow down 3 times
    cy.get('#custom-listbox').realPress('ArrowDown')
    cy.get('#custom-listbox').realPress('ArrowDown')
    cy.get('#custom-listbox').realPress('ArrowDown')

    // Enter to select
    cy.get('[data-qa="option-NO"]').should('have.focus')

    cy.realPress('{enter}')

    cy.get('#custom[value="Norway"]:focus').should('exist')

    // Click to focus
    cy.get('#custom').click()

    // Search for "net"
    cy.get('#custom').type('{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}net')

    // Tab out of autocomplete
    cy.get('#set-value-btn').focus()

    // Expect the value to be "Norway" and autocomplete to be collapsed
    cy.get('#custom[aria-expanded="false"][value="Norway"]').should('exist')
  })

  it('should search anew after selecting a value', () => {
    cy.on('uncaught:exception', (err) => !RE_RESIZE_OBSERVER_LOOP_ERROR.test(err.message))

    cy.visit('/frame/?path=/components/autocomplete/custom')

    // Click to focus
    cy.get('#custom').click()

    // Search for "nor"
    cy.get('#custom').type('nor')

    // Arrow down 3 times
    cy.get('#custom-listbox').realPress('ArrowDown')
    cy.get('#custom-listbox').realPress('ArrowDown')
    cy.get('#custom-listbox').realPress('ArrowDown')

    // Enter to select
    cy.get('[data-qa="option-NO"]').should('have.focus')
    cy.realPress('{enter}')

    cy.get('#custom[value="Norway"]:focus').should('exist')

    // Click to focus
    cy.get('#custom').click()

    // Search for "nor"
    cy.get('#custom').type('{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}net')

    // Arrow down 1 time
    cy.get('#custom-listbox').realPress('ArrowDown')

    // Enter to select
    cy.get('[data-qa="option-NL"]').should('have.focus')
    cy.realPress('{enter}')

    // Expect "Netherlands" to be selected
    cy.get('#custom[value="Netherlands"]:focus').should('exist')
  })

  it('should trigger focus and blur', () => {
    cy.on('uncaught:exception', (err) => !RE_RESIZE_OBSERVER_LOOP_ERROR.test(err.message))

    cy.visit('/frame/?path=/components/autocomplete/focus-and-blur')

    // Click to focus
    cy.get('#focus-and-blur').click()
    cy.get('#focus-and-blur-log').should('have.text', '["focus"]')

    // Click body to blur
    cy.get('body').click()
    cy.get('#focus-and-blur-log').should('have.text', '["focus","blur"]')

    // Clear log
    cy.get('#focus-and-blur-clear-btn').click()

    // Click to focus
    cy.get('#focus-and-blur').click()

    // Search for "nor"
    cy.get('#focus-and-blur').type('foo')
    cy.get('#focus-and-blur-listbox').realPress('ArrowDown')
    cy.get('#focus-and-blur-option-foo > div').should('have.focus')
    cy.get('#focus-and-blur-option-foo > div').click()

    // Expect "foo" to be selected
    cy.get('#focus-and-blur[value="foo"]:focus').should('exist')
    cy.get('#focus-and-blur-log').should('have.text', '["focus"]')

    // Click body to blur
    cy.get('body').click()
    cy.get('#focus-and-blur-log').should('have.text', '["focus","blur"]')
  })
})
