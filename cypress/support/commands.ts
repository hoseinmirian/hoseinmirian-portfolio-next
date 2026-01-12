/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }


declare namespace Cypress {
  interface Chainable {
    getByData(dataTestAttribute: string): Chainable<JQuery<HTMLElement>>
    // the below 3 commands are page-level assertions
    assertCommonAccessibility(): Chainable<void>
    assertSeoBasics(): Chainable<void>
    assertBasicLayoutSanity(): Chainable<void>
  }
}

const assertCommonAccessibility = () => {
  // should only be applied on pages

  // exactly one h1
  cy.get('h1').should('have.length', 1)

  // `lang` attribute on html
  cy.document()
    .its('documentElement.lang')
    .should('match', /^[a-z]{2}(-[A-Z]{2})?$/)

  // page title should not be empty
  cy.title().should('not.be.empty')

  // main landmark
  cy.get('main').should('exist')

  // no empty buttons
  cy.get('button').each($btn => {
    const text = $btn.text().trim()
    const ariaLabel = $btn.attr('aria-label')
    expect(Boolean(text || ariaLabel)).to.eq(true)
  })

  // no empty links
  cy.get('a').each($a => {
    const text = $a.text().trim()
    const ariaLabel = $a.attr('aria-label')
    const ariaHidden = $a.attr('aria-hidden') === 'true'
    if (!ariaHidden) {
      expect(Boolean(text || ariaLabel)).to.eq(true)
    }
  })

  // images must have non\-empty alt text
  cy.get('img').each($img => {
    const alt = $img.attr('alt')?.trim()
    expect(alt).to.not.eq('')
  })

  // enforce unique `id`s
  cy.get('[id]').then($els => {
    const ids = $els.toArray().map(el => el.id)
    expect(new Set(ids).size).to.eq(ids.length)
  })
}

const assertSeoBasics = () => {
  cy.get('head meta[name="description"]')
    .should('have.length', 1)
    .invoke('attr', 'content')
    .should('match', /\S/)

  cy.get('head meta[name="viewport"]')
    .should('have.length', 1)
    .invoke('attr', 'content')
    .should('match', /width=device-width/i)

  cy.get('head link[rel="canonical"]').then($links => {
    if ($links.length > 0) {
      cy.wrap($links)
        .should('have.length', 1)
        .invoke('attr', 'href')
        .should('match', /^https?:\/\//)
    }
  })
}

const assertBasicLayoutSanity = () => {
  cy.window().then(win => {
    const hasHorizontalScroll =
      win.document.body.scrollWidth > win.innerWidth + 1
    expect(hasHorizontalScroll, 'no horizontal scrollbar').to.eq(false)
  })

  cy.get('header').should('exist')
  cy.get('footer').should('exist')
  cy.get('nav').should('exist')
}


Cypress.Commands.add('getByData', selector => {
  return cy.get(`[data-cy=${selector}]`)
})

Cypress.Commands.add('assertCommonAccessibility', () => {
  assertCommonAccessibility()
})

Cypress.Commands.add('assertSeoBasics', () => {
  assertSeoBasics()
})

Cypress.Commands.add('assertBasicLayoutSanity', () => {
  assertBasicLayoutSanity()
})


