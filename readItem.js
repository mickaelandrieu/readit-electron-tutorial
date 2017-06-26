const {BrowserWindow} = require('electron')

let win

module.exports = (itemUrl, callback) => {
    let win = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            offscreen: true
        },
        show: false
    })

    win.loadURL(itemUrl)
    
    win.webContents.on('did-finish-load', () => {
        let capture = win.webContents.capturePage((nativeImage) => {
            let item = {}
            item.capture = nativeImage.toDataURL()
            item.title = win.getTitle()
            item.url = itemUrl

            callback(item)

            win.close()
            win = null
        })
    })
    
}
