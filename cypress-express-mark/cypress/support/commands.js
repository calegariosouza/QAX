Cypress.Commands.add('createTask', (taskName = '') => {

  cy.visit('http://localhost:8080')

  cy.get('input[placeholder="Add a new Task"]').as('inputTask')

  if (taskName !== '') {
    cy.get('@inputTask')
      .type(taskName)
  }

  cy.contains('button', 'Create').click()
})

Cypress.Commands.add('isRequired', (targetMessage) => {
  
  cy.get('@inputTask')
      .invoke('prop', 'validationMessage')
      .should((text) => {
        expect(
          targetMessage
        ).to.eq(text)
      })
})

Cypress.Commands.add('removeTaskByName', (taskName) => {
  cy.request({
    url: 'http://localhost:3333/helper/tasks',
    method: 'DELETE',
    body: { name: taskName }
  }).then(response => {
    expect(response.status).to.eq(204)
  })
})

Cypress.Commands.add('postTask', (task) => {
  cy.request({
    url: 'http://localhost:3333/tasks',
    method: 'POST',
    body: task
  }).then(response => {
    expect(response.status).to.eq(201)
  })
})