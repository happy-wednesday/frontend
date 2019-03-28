export default function (cli) {
  return {
    list (page) {
      return cli.get('thread/', {params: {offset: page}})
    },
    one (id) {
      return cli.get('thread/' + id + '/')
    },
    post (req) {
      return cli.post('thread/', req)
    },
  }
}
