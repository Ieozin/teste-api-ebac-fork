/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

describe('Testes da Funcionalidade Usuários', () => {

  it('Deve validar contrato de usuários', () => {
    cy.request({
      method: 'Get',
      url: 'usuarios'
    }).should((response) =>{
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('usuarios')
      expect(response.body.usuarios).to.be.an('array')
    })
  })

  it('Deve listar usuários cadastrados', () => {
    cy.request({
      method: 'GET',
      url: 'usuarios'
    }).should((response) => {
      expect(response.status).equal(200)
  })
    
  })

  it('Deve cadastrar um usuário com sucesso', () => {
    cy.cadastrarUsuario(faker.person.firstName(), faker.internet.email(), 'teste123')
    .should((response) => {
      expect(response.status).equal(201)
      expect(response.body.message).equal('Cadastro realizado com sucesso')
    })
  })

  it('Deve validar um usuário com email inválido', () => {
    cy.cadastrarUsuario('leonardo', 'leonardomartins@gmail.com', 'leo123')
    .should((response) => {
      expect(response.status).equal(400)
      expect(response.body.message).equal('Este email já está sendo usado')
    })

  })

  it('Deve editar um usuário previamente cadastrado', () => {
    cy.cadastrarUsuario(faker.person.firstName(), faker.internet.email(), 'teste123').then((response) => {
      const id = response.body._id
      cy.request({
        method: 'PUT',
        url: `usuarios/${id}`,
        body: {
                 nome: 'leonardo',
                 email: faker.internet.email(),
                 password: 'leo123',
                 administrador: 'true'
              }
      }).should((response) => {
        expect(response.status).equal(200);
        expect(response.body.message).equal('Registro alterado com sucesso')
      })

    })

  })
  
  it('Deve deletar um usuário previamente cadastrado', () => {
    cy.cadastrarUsuario(faker.person.firstName(), faker.internet.email(), 'teste123').then((response) => {
      const id = response.body._id
      cy.request({
        method: 'DELETE',
        url: `usuarios/${id}`
      }).should((response) => {
        expect(response.status).equal(200)
        expect(response.body.message).equal('Registro excluído com sucesso')
      })

    })

  })

})
