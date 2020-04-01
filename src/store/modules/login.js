import axios from 'axios'

export default {
    state: {
        status: '',
        token: localStorage.getItem('token') || '',
        user: localStorage.getItem('user') || '',
        error:'Неверный логин или пароль!'
    },
    mutations: {

        setToken(state, token) {
          state.token = token.role
          state.user = token.id
        },

        logout(state) {

          state.token = localStorage.removeItem('token')
          state.token = localStorage.removeItem('user')

          window.location.href = '/'
        },

        error(state, e) {
          state.error = e
        }
    },
    actions: {

        async login(ctx, user){
            
          try {
            await axios.get('http://localhost:3000/users', {params: {login: user[0]}})
            .then(res => {
              
              if (Number(res.data[0].password) === Number(user[1])) {

                localStorage.setItem('token', res.data[0].role)
                localStorage.setItem('user', res.data[0].id)
                ctx.commit('setToken', res.data[0])
                window.location.href = '/posts'

              } else {

                throw new Error('Неверный логин или пароль!')

              }
            }).catch(err => {
              console.log(err)
              ctx.commit('error', ctx.state.error)
            });
          } catch(err) {
            ctx.commit('error', ctx.state.error)
          }
            
        }
    },
    getters: {
        getToken(state) {
          return state.token
        },
        getUser(state) {
          return state.user
        },
        getError(state) {
          return state.error
        }
    }
}