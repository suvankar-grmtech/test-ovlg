/// <reference types="cypress" />

describe('ovlg commercial pages load test', () => {
  const p1_max_load_time = 4000
  it(`debt-consolidation/payday-loan.html load time should less than ${p1_max_load_time} ms`, () => {
    const p1_t0 = performance.now()
    cy.intercept('GET', '/debt-consolidation/payday-loan.html').as('p1_Page')
    cy.visit('https://www.ovlg.com/debt-consolidation/payday-loan.html')
    cy.wait('@p1_Page').then(({ response }) => {
      expect(response.statusCode).to.eq(200)
      const p1_t1 = performance.now()
      const p1_dt = p1_t1 - p1_t0
      cy.wrap(p1_dt).should('be.lte', p1_max_load_time);
    })
  })

  const p2_max_load_time = 4000
  it(`debt-consolidation load time should less than ${p2_max_load_time} ms`, () => {
    const p2_t0 = performance.now()
    cy.intercept('GET', '/debt-consolidation').as('p2_Page')
    cy.visit('https://www.ovlg.com/debt-consolidation')
    cy.wait('@p2_Page').then(({ response }) => {
      expect(response.statusCode).to.eq(200)
      const p2_t1 = performance.now()
      const p2_dt = p2_t1 - p2_t0
      cy.wrap(p2_dt).should('be.lte', p2_max_load_time);
    })
  })

})