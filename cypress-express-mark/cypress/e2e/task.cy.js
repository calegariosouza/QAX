/// <reference types ="cypress" />

describe('Tasks', () => {

  it('Deve cadastrar uma nova tarefa', () => {

   const taskName = 'Ler um livro de node.js'

    cy.removeTaskByName(taskName)
    cy.createTask(taskName)

    cy.contains('._listItemText_1kgm5_39', taskName)
      .should('be.visible')
  })

  it('Não deve permitir tarefa duplicada', () => {

    const task = {
      name: 'Estudar Javascript',
      is_done: false
    }

    cy.removeTaskByName(task.name)
    cy.postTask(task)
    cy.createTask(task.name)

    cy.get('.swal2-html-container')
      .should('be.visible')
      .should('have.text', 'Task already exists!')
  })
})