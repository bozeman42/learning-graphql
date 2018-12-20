const axios = require('axios')

const {
  buildSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList
} = require('graphql')


const PeopleType = new GraphQLObjectType({
  name: 'People',
  fields: () => ({
    name: { type: GraphQLString },
    height: { type: GraphQLInt, resolve: person => parseInt(person.height) },
    homeworld: {
      type: PlanetType,
      resolve: async person => {
        const { data } = await axios.get(person.homeworld)
        return data
      }
    }
  })
})

const PlanetType = new GraphQLObjectType({
  name: 'Planets',
  fields: () => ({
    name: { type: GraphQLString },
    rotationPeriod: { type: GraphQLInt, resolve: planet => parseInt(planet.rotation_period) },
    diameter: { type: GraphQLInt, resolve: planet => parseInt(planet.diameter) },
    population: { type: GraphQLInt, resolve: planet => parseInt(planet.population) },
    residents: { 
      type: new GraphQLList(PeopleType),
      resolve: async planet => {
        const people = planet.residents
        return people.map(async person => {
          const { data } = await axios.get(person)
          return data
        })
    }}
  })
})

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
      people: {
        type: PeopleType,
        args: {
          id: { type: GraphQLInt }
        }
      },
      planets: {
        type: PlanetType,
        args: {
          id: { type: GraphQLInt }
        }
      }
    })
  })
})

const root = {
  people: async ({ id }) => {
    if (id === undefined) {
      id = 1
    }
    const { data } = await axios.get(`https://swapi.co/api/people/${id}`)
    return data
  },
  planets: async ({ id }) => {
    if (id === undefined) {
      id = 1
    }
    const { data } = await axios.get(`https://swapi.co/api/planets/${id}`)
    return data
  }
}

module.exports = {
  schema,
  rootValue: root,
  graphiql: true
}