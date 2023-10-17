context('Primitives/TextInput', () => {
  it('read-only input should have focus styling', () => {
    cy.visit('/frame/?path=/primitives/text-input/read-only')

    cy.get('#text-input-example').click()

    cy.get('#text-input-example + span').should(
      'have.css',
      'boxShadow',
      'rgb(65, 225, 246) 0px 0px 0px 1px inset, rgb(243, 244, 246) 0px 0px 0px 1px inset',
    )
  })
})
