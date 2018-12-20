const message = document.querySelector('#message')

console.log(message)

const query = `
{
  characters {
    greeting
  }
}
`

fetch(`/graphql?query=${query}`,{
  method: 'GET'
}).then(response => {
  response.json()
  .then(json => {
    console.log(json)
  })
})