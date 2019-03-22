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

  it('log in using modal', function() {
    cy.fixture('test-user').then((json) => {
      const { email, password } = json;

      cy.get('#login-btn').click();

      cy.get('input[id=auth-modal-email]').type(email);
      cy.get('input[id=auth-modal-password]').type(password);
      cy.get('#auth-modal-ok-btn').click();

      cy.get('#user-avatar-btn').should('exist');
    });
  });

  it('log out', function() {
    cy.get('#user-avatar-btn').click();
    cy.get('#sign-out-btn').click();

    cy.get('#user-avatar-btn').should('not.exist');
  });
});
