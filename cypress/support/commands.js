Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {

    cy.get('#firstName').type('José');
    cy.get('#lastName').type('Costa');
    cy.get('#email').type('jose@email.com');
    cy.get('#open-text-area').type('teste');
    cy.get('button[type="submit"]').click();
})