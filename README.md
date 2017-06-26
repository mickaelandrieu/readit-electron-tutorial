# readit-electron-tutorial
Real Electron application to play with main concepts

This cross-platform desktop application allows you to bookmark links and access it later.

It's simple but you will discover many concepts of Electron development:

* Communication between Renderer layer and Main layer
* `BrowserWindow` module
* Use `npm` modules in Electron projects
* Use and require templates and styles
* Basic use of persistence, with `localStorage`
* Use of `NativeImage` module, useful for Scrapping and Image manipulation
* Use basic Javascript knowledges to make a concrete desktop application

The application use ES6 but it's readable for everyone.

## Hack it?

```
  cd readit-electron-tutorial &&
     npm i -g electron &&
     npm i &&
     npm i devtron --save-dev &&
     npm i -g bower &&
     bower install &&
     electron .
```

## Use it as real application?

Install [electron packager](https://www.npmjs.com/package/electron-packager):

```
  npm i -g electron-packager &&
  electron-packager . --platform={win32|darwin|darwin|x86|x86_64|armv7l} --electron-version="{version}"
 ```
