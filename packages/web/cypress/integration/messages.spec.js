/// <reference types="Cypress" />

context('Actions', () => {
  before(() => {
    cy.visit('/');

    cy.fixture('test-user').then((json) =>
      cy.request({
        method: 'POST',
        url: '/api/v1/user',
        body: json,
        failOnStatusCode: false
      })
    );
  });

  it('create messages after login', function() {
    cy.fixture('test-user').then((json) => {
      const { email, password } = json;

      cy.get('#unauthorized-warning-msg').should('exist');

      cy.get('#login-btn').click();

      cy.get('input[id=auth-modal-email]').type(email);
      cy.get('input[id=auth-modal-password]').type(password);
      cy.get('#auth-modal-ok-btn').click();

      cy.get('#messages-sgmt-grp').should('exist');

      cy.get('.message-item').then(($prevGrp) => {
        const prevLength = $prevGrp.length;

        cy.get('#add-message-btn').click();

        cy.get('.message-item').should(($grp) => {
          expect($grp.length).be.eq(prevLength + 1);
        });
      });
    });
  });
});
