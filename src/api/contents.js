export default function (cli) {
  return {
    list (page) {
      return cli.get('contents/', {params: {offset: page}})
    },
    post (req) {
      return cli.post('contents/', req)
    },
  }
}
