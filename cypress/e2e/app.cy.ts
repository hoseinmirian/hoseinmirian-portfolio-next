describe('Application', () => {

  beforeEach(() => {
    cy.visit('/');
    cy.assertCommonAccessibility()
    cy.assertBasicLayoutSanity()
    cy.assertSeoBasics()
  })
  
  context('Navigation', () => {
    it('should visit home page', () => {
      cy.contains('h1', /Home/i)
    })
    
    it('should navigate to resume page', () => {
      cy.getByData('main-nav-resume').click()

      cy.contains('h1', /Resume/i)
    })

    it('should navigate to portfolio page', () => {
      cy.getByData('main-nav-portfolio').click()

      cy.contains('h1', /Portfolio/i)
    })

    it('should navigate to contact page', () => {
      cy.getByData('main-nav-contact').click()

      cy.contains('h1', /Contact/i)
    })

    it('should redirect to not found page', () => {
      cy.visit('/invalid-route', { failOnStatusCode: false })

      cy.contains('h1', /404/)
    })
  })
})
