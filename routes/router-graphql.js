const router = require('express').Router()
const graphqlHTTP = require('express-graphql')
const helloWorldSchema = require('../modules/schema-hw')

router.use('/',graphqlHTTP(helloWorldSchema))

module.exports = router
