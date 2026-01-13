describe('Application', () => {
  Cypress.on('uncaught:exception', err => {
    // Next.js/React hydration errors are common in CI/Production builds
    // and usually don't interfere with test functionality.
    if (
      err.message.includes('Minified React error #418') ||
      err.message.includes('Minified React error #423') ||
      err.message.includes('hydration')
    ) {
      return false // This prevents Cypress from failing the test
    }

    // Let other errors (actual app crashes) still fail the test
    return true
  })

  context('Navigation', () => {
    beforeEach(() => {
      cy.visit('/')
      cy.assertCommonAccessibility()
      cy.assertBasicLayoutSanity()
      cy.assertSeoBasics()
    })

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

  context('HomePage', () => {
    beforeEach(() => {
      cy.visit('/')
    })

    it('should show portfolio items', () => {
      cy.getByData('portfolio-list-wrapper').within(() => {
        cy.getByData('portfolio-list')
          .find('[data-cy="portfolio-item"]')
          .should('exist')
          .should('have.length.greaterThan', 0)
      })
    })

    it('should render an image for each portfolio item', () => {
      cy.getByData('portfolio-list-wrapper').within(() => {
        cy.getByData('portfolio-list')
          .find('[data-cy="portfolio-item"]')
          .each(($item) => {
            cy.wrap($item)
              .find('img')
              .should('be.visible')
              .and('have.attr', 'src')
          })
      })
    })

    it('should direct user to portfolio page after clicking view all project button', () => {
      cy.getByData('portfolio-list-wrapper').within(() => {
        const viewAllProjectsButton = cy.getByData('view-all-projects-button')
          
        viewAllProjectsButton
          .should('exist')
          .and('be.visible')
          .and('have.text', 'View All Projects').click()
        
        cy.location('pathname').should('eq', '/portfolio')
      })
    })
  })

  context('ResumePage', () => {
    beforeEach(() => {
      cy.visit('/resume')
    })

    it('should show resume items', () => {
      cy.getByData('resume-list-wrapper').within(() => {
        cy.getByData('timeline-list')
          .find('[data-cy="timeline-item"]')
          .should('exist')
          .should('have.length.greaterThan', 0)
      })
    })
  })

  context('PortfolioPage', () => {
    beforeEach(() => {
      cy.visit('/portfolio')
    })

    it('should show portfolio items', () => {
      cy.getByData('portfolio-list-wrapper').within(() => {
        cy.getByData('portfolio-list')
          .find('[data-cy="portfolio-item"]')
          .should('exist')
          .should('have.length.greaterThan', 0)
      })
    })

    it('should render an image for each portfolio item', () => {
      cy.getByData('portfolio-list-wrapper').within(() => {
        cy.getByData('portfolio-list')
          .find('[data-cy="portfolio-item"]')
          .each($item => {
            cy.wrap($item)
              .find('img')
              .should('be.visible')
              .and('have.attr', 'src')
          })
      })
    })
  })

  context('Contact', () => {
    beforeEach(() => {
      cy.visit('/contact')
    })

    it('should show contact form', () => {
      cy.getByData('contact-wrapper').within(() => {
        cy.getByData('contact-form').should('exist').and('be.visible')
      })
    })
  })
})
