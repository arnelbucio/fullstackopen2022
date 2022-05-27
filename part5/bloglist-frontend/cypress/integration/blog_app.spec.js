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
      cy.login({ username: 'arnelbucio', password: 'hunter2' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#blog-title').type('a blog created by cypress')
      cy.get('#blog-author').type('Cypress')
      cy.get('#blog-url').type('/test-url/')
      cy.get('#create-blog-button').click()
      cy.contains('a blog created by cypress')
    })

    describe('and several blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'first blog', author: 'Joe', url: '/1' })
        cy.createBlog({ title: 'second blog', author: 'Joe', url: '/2' })
        cy.createBlog({ title: 'third blog', author: 'Joe', url: '/3' })
      })

      it('one of those can be liked', function () {
        cy.contains('second blog').parent().as('blog')
        cy.get('@blog').contains('view').click()

        cy.get('@blog').should('contain', '0')
        cy.get('@blog').contains('like').click()

        cy.get('@blog').should('contain', '1')
      })

      it('own blog can be deleted', function () {
        cy.contains('second blog').parent().as('blog')
        cy.get('@blog').parent().as('blogContainer')
        cy.get('@blog').contains('view').click()
        cy.get('@blog').contains('remove').click()

        cy.get('@blogContainer').should('not.contain', 'second blog')
      })

      describe('logged in as other user', function() {
        beforeEach(function() {
          const user = {
            name: 'User2',
            username: 'user2',
            password: 'hunter2'
          }
          cy.request('POST', 'http://localhost:3003/api/users/', user)

          cy.logout()
          cy.login({ username: 'user2', password: 'hunter2' })
          cy.visit('http://localhost:3000')
        })

        it('cannot delete blog of other user', function () {
          cy.contains('second blog').parent().as('blog')
          cy.get('@blog').contains('view').click()
          cy.get('@blog').should('not.contain', 'remove')
        })
      })
    })
  })
})