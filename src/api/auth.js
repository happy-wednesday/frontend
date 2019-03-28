export default function (cli) {
  return {
    login (email, password) {
      const data = {
        email,
        password,
      }
      return cli.post('auth/', data)
    },
    register (email, password) {
      const data = {
        email,
        password,
      }
      return cli.post('register/', data)
    },
    mypage () {
      return cli.get('mypage/')
    },
  }
}
