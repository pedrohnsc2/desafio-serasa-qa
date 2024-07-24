import { faker } from '@faker-js/faker';
import url from '../../support/urls';
import messages from '../../support/messages';

describe('Valida cenários de criação do board', () => {

    let auth = Cypress.env('auth')
    let id
    it('Cria board com sucesso', () => {
        cy.postBoard(url.boards + '?name=', faker.company.name(), auth.apiKey, auth.apiToken)
            .then(response => {
                id = response.body.id
                expect(response.status).to.equal(200)
            })
    })

    it('Tenta criar board com apiKey inválido', () => {
        cy.postBoard(url.boards + '?name=', faker.company.name(), auth.apiKeyInvalido, auth.apiToken)
            .then(response => {
                expect(response.status).to.equal(401)
                expect(response.body).to.equal(messages.invalidKey)
            })
    })

    it('Tenta criar board com apiToken inválido', () => {
        cy.postBoard(url.boards + '?name=', faker.company.name(), auth.apiTokenInvalido, auth.apiToken)
            .then(response => {
                expect(response.status).to.equal(401)
                expect(response.body).to.equal(messages.invalidKey)
            })
    })

    after('Limpa a massa de dados criada',() => {
        cy.delete(url.boards, id, auth.apiKey, auth.apiToken)
    })

})

describe('Valida Deleção de board', () => {

    let auth = Cypress.env('auth')
    let id
    before(() => {
        cy.postBoard(url.boards + '?name=', faker.company.name(), auth.apiKey, auth.apiToken)
            .then(response => {
                id = response.body.id
            })
    })
    it('Deleta board com sucesso', () => {
        cy.delete(url.boards, id, auth.apiKey, auth.apiToken)
            .then(response => {
                expect(response.status).to.equal(200)
            })
    })

    it('Tenta deletar board com apiKey inválido', () => {
        cy.delete(url.boards, id, auth.apiKeyInvalido, auth.apiToken)
            .then(response => {
                expect(response.status).to.equal(401)
                expect(response.body).to.equal(messages.invalidKey)
            })
    })

    it('Tenta deletar board com apiToken inválido', () => {
        cy.delete(url.boards, id, auth.apiToken, auth.apiTokenInvalido)
            .then(response => {
                expect(response.status).to.equal(401)
                expect(response.body).to.equal(messages.invalidKey)
            })
    })
})

