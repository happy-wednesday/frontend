'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ENDPOINT: '"http://localhost:8000/api/1.0/"',
  API_TOKEN:'',
  API_SECRET_KEY:'',
})
