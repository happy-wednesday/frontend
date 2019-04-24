'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ENDPOINT: '"http://localhost:8000/api/1.0/"',
  HWD_API_TOKEN:'"579c1e99c4d57beabeb8e8872e20f6d9"',
  HWD_API_SECRET_KEY:'"OgKDbXXgx4xB"',
})
