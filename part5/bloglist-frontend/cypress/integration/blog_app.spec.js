describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Arnel Bucio',
      username: 'arnelbucio',
      password: 'hunter2'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('arnelbucio')
      cy.get('#password').type('hunter2')
      cy.get('#login-button').click()

      cy.contains('Arnel Bucio logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('arnelbucio')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Arnel Bucio logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('arnelbucio')
      cy.get('#password').type('hunter2')
      cy.get('#login-button').click()
    })

    it.only('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#blog-title').type('a blog created by cypress')
      cy.get('#blog-author').type('Cypress')
      cy.get('#blog-url').type('/test-url/')
      cy.get('#create-blog-button').click()
      cy.contains('a blog created by cypress')
    })
  })

})