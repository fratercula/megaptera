const falco = require('@fratercula/falco')
const { join } = require('path');

(async () => {
  try {
    const { template } = await falco({
      entry: join(process.cwd(), 'code.js'),
      targets: { esmodules: true },
    })
    console.log(template)
  } catch (e) {
    console.log(e)
  }
})()
