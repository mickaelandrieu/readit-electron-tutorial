// Modules

const {ipcRenderer} = require('electron')
const urlValidator = require('valid-url')
const itemStore = require('./itemStore')

// Modal management
let modalBox = $('#add-modal')
let openModalBtn = $('.open-add-modal')
let closeModalBtn = $('.close-add-modal')

openModalBtn.click(() => {
    $('#add-modal').addClass('is-active')
})

closeModalBtn.click(() => {
    $('#add-modal').removeClass('is-active')
})

// Items management
let itemInput = $('#item-input')
let addButton = $('#add-button')

let loadUrlBehaviorUI = () => {
    itemInput.prop('disabled', true)
    addButton.addClass('is-loading')
    closeModalBtn.addClass('is-disabled')
}

let loadUrlBehaviorDoneUI = () => {
    itemInput.prop('disabled', false).val('')
    addButton.removeClass('is-loading')
    closeModalBtn.removeClass('is-disabled')

    // and close the modal!
    modalBox.removeClass('is-active')

    if (1 === itemStore.items.length)
        $('.read-item:first()').addClass('is-active')
}

addButton.click(() => {
    let newItemURL = itemInput.val();
    if (newItemURL && urlValidator.isWebUri(newItemURL)) {
        loadUrlBehaviorUI()
        ipcRenderer.send('new-item', newItemURL);
    }
})

itemInput.keyup((e) => {
    if(e.key == 'Enter') {
        addButton.click();
    }
})

ipcRenderer.on('new-item-success', (e, item) => {
    itemStore.add(item)
    itemStore.items.push(item)
    itemStore.saveItems()

    loadUrlBehaviorDoneUI()
})

if (itemStore.items.length) {
   itemStore.items.forEach(itemStore.add)
   $('.read-item:first()').addClass('is-active')
}

// Search/Filter management
$('#search').keyup((e) => {
    let filter = $(e.currentTarget).val()

    $('.read-item').each((i, el) => {
        $(el).text().toLowerCase().includes(filter) ? $(el).show() : $(el).hide()
    })
})