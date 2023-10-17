it.only('testa a página da política de privacidade de forma independente', () => {
    cy.visit('./src/privacy.html')
    // cy.get('#privacy a').invoke('removeAttr', 'target').click() 
    cy.contains('Talking About Testing').should('be.visible')
})