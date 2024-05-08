/*
* File: app.js
* Author: Kiss Cintia
* Copyright: 2024, Kiss Cintia
* Group: Szoft I-2-N
* Date: 2024-05-08
* Github: https://github.com/KissCintia/
* Licenc: GNU GPL
*/

const doc = {
    panaszBody: document.querySelector("#panaszBody"),
    complainantInput: document.querySelector('#complainant'),
    descriptionInput: document.querySelector('#description'),
    productsInput: document.querySelector('#products'),
    typeInput: document.querySelector('#type'),
    mentesButton: document.querySelector('#mentesButton')
}

const state = {
    host : 'http://localhost:4500',
    endpoint: 'panaszok',
    id: 0,
    complainant: ' ',
    description: ' ',
    products: ' ',
    type: ' '
} 


doc.mentesButton.addEventListener('click', () => {
    console.log("Mentés...")
    setPanaszAllapot()
    addPanasz()
})

getPanasz()
function setPanaszAllapot(){
    state.complainant = doc.complainantInput.value
    state.description = doc.descriptionInput.value
    state.products = doc.productsInput.value
    state.type = doc.typeInput.value
    deleteContent()
}

function addPanasz() {
    let url = state.host + '/' + state.endpoint
    fetch(url, {
        method: 'post',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
                complainant : state.complainant,
                description : state.description,
                products : state.products,
                type : state.type
        })
    })
}

function getPanasz() {
    let url = state.host + '/' + state.endpoint
    fetch(url)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        doc.panaszBody.textContent = ''
        renderPanasz(result)
    })
}

function renderPanasz(panaszList){
    panaszList.forEach(panasz => {
        const tr = document.createElement('tr')
        tr.innerHTML = `
            <td>${panasz.id}</td>
            <td>${panasz.complainant}</td>
            <td>${panasz.description}</td>
            <td>${panasz.products}</td>
            <td>${panasz.type}</td>
        `
        doc.panaszBody.appendChild(tr)
    });
}

function deleteContent(){
    doc.complainantInput.value = ''
    doc.descriptionInput.value = ''
    doc.productsInput.value = ''
    doc.typeInput.value = ''
}