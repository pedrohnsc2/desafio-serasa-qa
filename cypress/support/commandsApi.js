/**
 * Custom Cypress command to get a specific account from the Trello API.
 *
 * @param {string} endPoint - The API endpoint.
 * @param {string} idBoard - The ID of the board.
 * @param {string} key - The API key.
 * @param {string} token - The API token.
 */
Cypress.Commands.add('getConta', (endPoint, idBoard, key, token) => {
    cy.request({
        method: 'GET',
        url: Cypress.env('api_trello') + endPoint + idBoard,
        failOnStatusCode: false,
        qs: { key: key, token: token },
        headers: {
            'Accept': 'application/json'
        }
    })
})

/**
 * Custom Cypress command to create a new board using the Trello API.
 *
 * @param {string} endPoint - The API endpoint.
 * @param {string} name - The name of the board.
 * @param {string} key - The API key.
 * @param {string} token - The API token.
 */
Cypress.Commands.add('postBoard', (endPoint, name, key, token) => {
    cy.request({
        method: 'POST',
        url: Cypress.env('api_trello') + endPoint,
        failOnStatusCode: false,
        qs: { name: name, key: key, token: token },
    })
})

/**
 * Custom Cypress command to delete a resource using the Trello API.
 *
 * @param {string} endPoint - The API endpoint.
 * @param {string} id - The ID of the resource to delete.
 * @param {string} key - The API key.
 * @param {string} token - The API token.
 */
Cypress.Commands.add('delete', (endPoint, id, key, token) => {
    cy.request({
        method: 'DELETE',
        url: Cypress.env('api_trello') + endPoint + id,
        failOnStatusCode: false,
        qs: { key: key, token: token },
    })
})

/**
 * Custom Cypress command to get a specific board from the Trello API.
 *
 * @param {string} endPoint - The API endpoint.
 * @param {string} idBoard - The ID of the board.
 * @param {string} endpoint2 - The second part of the API endpoint.
 * @param {string} key - The API key.
 * @param {string} token - The API token.
 */
Cypress.Commands.add('getBoard', (endPoint, idBoard, endpoint2, key, token) => {
    cy.request({
        method: 'GET',
        url: Cypress.env('api_trello') + endPoint + idBoard + endpoint2,
        failOnStatusCode: false,
        qs: { key: key, token: token },
        headers: {
            'Accept': 'application/json'
        }
    })
})

/**
 * Custom Cypress command to create a new card in a specific board using the Trello API.
 *
 * @param {string} endPoint - The API endpoint.
 * @param {string} idList - The ID of the list where the card will be created.
 * @param {string} key - The API key.
 * @param {string} token - The API token.
 */
Cypress.Commands.add('postCardBoard', (endPoint, idList, key, token) => {
    cy.request({
        method: 'POST',
        url: Cypress.env('api_trello') + endPoint,
        failOnStatusCode: false,
        qs: { idList: idList, key: key, token: token },
    })
})
