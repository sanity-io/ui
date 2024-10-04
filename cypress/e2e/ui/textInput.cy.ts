context('Primitives/TextInput', () => {
  it('read-only input should have focus styling', () => {
    cy.visit('/frame/?path=/primitives/text-input/read-only')

    cy.get('#text-input-example').click()

    cy.get('#text-input-example + span').should(
      'have.css',
      'boxShadow',
      'rgb(85, 107, 252) 0px 0px 0px 1px inset, rgb(187, 189, 201) 0px 0px 0px 1px inset',
    )
  })
})
