var config = {
  packages: {
    global: './.humpback/dist/global.js',
    devtools: './.humpback/dist/devtools.js',
    entry: './entry.js',
  },
  page: {
    path: '/',
    entry: 'entry',
    devtools: 'devtools',
  },
}
var humpback = new window.Humpback(config)

humpback.start()
