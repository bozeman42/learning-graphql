const router = require('express').Router()
const graphqlHTTP = require('express-graphql')
const swapiSchema = require('../modules/schema-sw')

router.use('/',graphqlHTTP(swapiSchema))

module.exports = router
