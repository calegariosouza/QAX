/// <reference types ="cypress" />

describe('Tasks', () => {

  context('Cadastro', () => {

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

    it('Campo Obrigatório', () => {
      cy.createTask()
      cy.isRequired('This is a required field')
    });
  })

  context('atualização', () => {

    it.only('Deve concluir uma tarefa', () => {
      const taskName = 'Pagar contas de consumo'

      cy.visit('http://localhost:8080')

      cy.contains('p', taskName)
        .parent()
        .find('button[class*=ItemToggle]')
        .click()

      cy.contains('p', taskName)
        .should('have.css', 'text-decoration-line', 'line-through')

    })
  })
})
