/* eslint-disable no-undef */
describe("Appoitnments", () => {

  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");
    cy.visit("/");
    cy.contains("Monday");
   });

  it("should book an appointment", () => {
    cy.get('[alt=Add]').first().click()
    cy.get('[data-testid=student-name-input]').type("Lydia Miller-Jones")
    cy.get('[alt="Sylvia Palmer"]').click()
    cy.contains("Save").click()
    cy.contains(".appointment__card--show", "Sylvia Palmer").should('exist')
    cy.contains(".appointment__card--show", "Lydia Miller-Jones").should('exist')
  })

  it("should edit an appointment", () => {
    cy.get('[alt=Edit]').first().click({force: true})
    cy.get('[data-testid=student-name-input]')
    .clear()
    .type("Kenneth")
    cy.get('[alt="Tori Malcolm"]').click()
    cy.contains("Save").click()
    cy.contains(".appointment__card--show", "Tori Malcolm").should('exist')
    cy.contains(".appointment__card--show", "Kenneth").should('exist')


  })

  it("should cancel an appointment", () => {
    cy.get('[alt=Delete]').first().click({force: true})
    cy.contains("Confirm").click()
    cy.contains("DELETING").should('exist')
    cy.contains("DELETING").should('not.exist')
    cy.contains(".appointment__card--show", "Archie Cohen").should('not.exist')
  })

})