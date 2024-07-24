import { faker } from '@faker-js/faker';
import url from '../../support/urls';
import messages from '../../support/messages';

describe('Valida criação de task no board', () => {

    let auth = Cypress.env('auth')
    let id
    let idLista
    before(() => {
        cy.postBoard(url.boards + '?name=', faker.company.name(), auth.apiKey, auth.apiToken)
            .then(response => {
                id = response.body.id
                cy.getBoard(url.boards, id, url.lists, auth.apiKey, auth.apiToken)
                    .then(response => {
                        idLista = response.body[0].id
                    })
            })
    })


    it('Cria um card no board com sucesso', () => {
        cy.postCardBoard(url.cards + '?', idLista, auth.apiKey, auth.apiToken)
            .then(response => {
                expect(response.status).to.equal(200)
            })
    })

    it('Tenta criar um card no board com apiToken inválido', () => {
        cy.postCardBoard(url.cards + '?', idLista, auth.apiKey, auth.apiTokenInvalido)
            .then(response => {
                expect(response.status).to.equal(401)
                expect(response.body).to.equal(messages.invalidAppToken)
            })
    })

    it('Tenta criar um card no board com apiKey inválido', () => {
        cy.postCardBoard(url.cards + '?', idLista, auth.apiKeyInvalido, auth.apiToken)
            .then(response => {
                expect(response.status).to.equal(401)
                expect(response.body).to.equal(messages.invalidKey)
            })
    })

    it('Tenta criar um card em board que não existe', () => {
        cy.postCardBoard(url.cards + '?', '12', auth.apiKey, auth.apiToken)
            .then(response => {
                expect(response.status).to.equal(400)
                expect(response.body).to.equal(messages.invalidValue)
            })
    })

    after(() => {
        cy.delete(url.boards, id, auth.apiKey, auth.apiToken)
    })

})

describe('Valida deleção de task no board', () => {

    let auth = Cypress.env('auth')
    let id
    let idLista
    let idCard
    before(() => {
        cy.postBoard(url.boards + '?name=', faker.company.name(), auth.apiKey, auth.apiToken)
            .then(response => {
                id = response.body.id
                cy.getBoard(url.boards, id, url.lists, auth.apiKey, auth.apiToken)
                    .then(response => {
                        idLista = response.body[0].id
                        cy.postCardBoard(url.cards + '?', idLista, auth.apiKey, auth.apiToken)
                            .then(response => {
                                idCard = response.body.id
                            })
                    })

            })
    })

    it('Deleta um card no board com sucesso', () => {
        cy.delete(url.cards, idCard, auth.apiKey, auth.apiToken)
            .then(response => {
                expect(response.status).to.equal(200)
            })
    })

    it('Tenta deletar um card no board com apiToken inválido', () => {
        cy.delete(url.cards, idCard, auth.apiKey, auth.apiTokenInvalido)
            .then(response => {
                expect(response.status).to.equal(401)
                expect(response.body).to.equal(messages.invalidAppToken)
            })
    })

    it('Tenta deletar um card no board com apiKey inválido', () => {
        cy.delete(url.cards, idCard, auth.apiKeyInvalido, auth.apiToken)
            .then(response => {
                expect(response.status).to.equal(401)
                expect(response.body).to.equal(messages.invalidKey)
            })
    })

    it('Tenta deletar um card em board que não existe', () => {
        cy.delete(url.cards, '12', auth.apiKey, auth.apiToken)
            .then(response => {
                expect(response.status).to.equal(400)
                expect(response.body).to.equal(messages.invalidId)
            })
    })
    after(() => {
        cy.delete(url.boards, id, auth.apiKey, auth.apiToken)
    })

})

