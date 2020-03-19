const { join } = require('path')
const { tmpdir } = require('os')

module.exports.tmpDir = join(tmpdir(), 'megaptera')
