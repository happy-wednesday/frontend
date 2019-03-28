export default function (cli) {
  return {
    list (page) {
      return cli.get('response/', {params: {offset: page}})
    },
    post (req) {
      return cli.post('response/', req)
    },
  }
}
