exports.items = JSON.parse(localStorage.getItem('items')) || []

exports.saveItems = () => {
    localStorage.setItem('items', JSON.stringify(this.items))
}

exports.selectItem = (e) => {
    $('.read-item').removeClass('is-active')
    $(e.currentTarget).addClass('is-active')
}

exports.openItem = () => {
    if (!this.items.length) return

    let targetItem = $('.read-item.is-active')
    let contentURL = encodeURIComponent(targetItem.data('url'))

    let readerWinURL = `file://${__dirname}/reader.html?url=${contentURL}`

    let readerWin = window.open(readerWinURL, targetItem.data('title'))
}

exports.add = (item) => {
    $('#no-items').hide()

    let itemHTML = `<a class="panel-block read-item" data-url="${item.url}" data-title="${item.title}">
                        <figure class="image has-shadow is-64x64 thumb">
                            <img src="${item.capture}">
                        </figure>
                        <h2 class="title is-4 column">${item.title}</h2>
                    </a>`
    $('#read-list').append(itemHTML)

    $('.read-item')
        .off('click, dblclick')
        .on('click', this.selectItem)
        .on('dblclick', this.openItem)
}