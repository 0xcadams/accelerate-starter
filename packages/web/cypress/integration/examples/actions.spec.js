/// <reference types="Cypress" />

context('Actions', () => {
  beforeEach(() => {
    cy.visit('/');

    cy.request({
      method: 'POST',
      url: '/api/v1/user',
      body: {
        name: 'Jane Lane',
        email: 'jane.lane@gmail.com',
        password: 'test123'
      },
      failOnStatusCode: false
    });
  });

  it('.click() - click on a DOM element', function() {
    const { email, password } = {
      email: 'jane.lane@gmail.com',
      password: 'test123'
    };

    cy.get('#login-btn').click();

    cy.get('input[id=auth-modal-email]').type(email);
    cy.get('input[id=auth-modal-password]').type(password);
    cy.get('#auth-modal-ok-btn').click();

    cy.get('#user-avatar-btn').should('exist');

    cy.getCookie('accelerate-jwt').should('exist');
  });
});
