const express = require('express')
const app = express()
const PORT = 5000

const graphqlRouter = require('./routes/router-graphql')
const swGraphQLRouter = require('./routes/router-sw-graphql')

app.use('/graphql',graphqlRouter)
app.use('/sw-graphql',swGraphQLRouter)

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`))
