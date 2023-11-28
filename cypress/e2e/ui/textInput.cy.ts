context('Primitives/TextInput', () => {
  it('read-only input should have focus styling', () => {
    cy.visit('/frame/?path=/primitives/text-input/read-only')

    cy.get('#text-input-example').click()

    cy.get('#text-input-example + span').should(
      'have.css',
      'boxShadow',
      'rgb(83, 92, 253) 0px 0px 0px 1px inset, rgb(216, 217, 223) 0px 0px 0px 1px inset',
    )
  })
})
