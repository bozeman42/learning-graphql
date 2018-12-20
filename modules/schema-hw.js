const { buildSchema } = require('graphql')

const schema = buildSchema(`
type Character {
  name: String!,
  greeting: String
}
  type Query {
    characters(id: Int): [Character]
  }
`)

const characters = [
  {
    id: 0,
    name: 'Bob',
    greeting: `Howdy, y'all!`
  },
  {
    id: 1,
    name: 'Charlie',
    greeting: `Meow!`
  },
]

const root = { 
    characters: async (args) => {
      return args.id === undefined ? characters : [characters[args.id]]
    }
  }

module.exports = {
  schema,
  rootValue: root,
  graphiql: true
}