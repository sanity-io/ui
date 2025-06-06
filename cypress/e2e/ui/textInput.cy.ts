context('Primitives/TextInput', () => {
  it('read-only input should have focus styling', () => {
    cy.visit('/frame/?path=/primitives/text-input/read-only')

    cy.get('#text-input-example').click()

    cy.get('#text-input-example + div').should(
      'have.css',
      'boxShadow',
      'oklab(0.847928 0.00172108 -0.0122313 / 0.625) 0px 0px 0px 1px inset',
    )
  })
})
