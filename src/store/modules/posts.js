import axios from 'axios'

export default {
    state: {
        posts: [],
        URL: 'http://localhost:3000/posts',
        postData: {
          id: 0,
          title: '',
          description: '',
          claps: 0,
          createdAt: new Date(),
          updateAt: '',
          userId: 0
        },
        activePopup: true
      },
      mutations: {
    
        updatePosts(state, data) {
          state.posts = data
        },
    
        createPost(state, data) {
           
          
          state.postData.title = data[0]
          state.postData.description = data[1]
          state.postData.userId = data[2]
    
          state.posts.push(state.postData)
          axios.post(state.URL, state.postData)
          .then(res => {
            window.location.href = '/posts'
          })
         
    
        },
    
        updatePost(state, data) {
          
           state.posts.forEach((i, index) => {
            
            if (i.id === data[0]) {
             
                state.postData = {
                id: i.id,
                title: data[1],
                description: data[2],
                claps: i.claps,
                createdAt: i.createdAt,
                updateAt: new Date(),
                userId: i.userId
              }
             
              state.posts[index].title = data[1]
              state.posts[index].description = data[2]
    
              axios.put(state.URL + '/' + data[0], state.postData)
            }
          })
        },
    
        updateClap(state, data) {
          
          state.posts.forEach((i, index) => {
            
            if (i.id === data) {
    
              state.postData = {
                id: data,
                title: i.title,
                description: i.description,
                claps: i.claps += 1,
                createdAt: i.createdAt,
                updateAt: new Date(),
                userId: i.userId
              }
              
              state.posts[index].claps = i.claps
              axios.put(state.URL + '/' + data, state.postData)
            }
          })
    
        },
    
        deletePostState(state, post) {

          axios.delete(state.URL + '/' + post)
         
          state.posts = state.posts.filter(function(item){
            return Number(item.id) != Number(post)
          })
        }
    
      },
      actions: {
    
        async fetchPosts(ctx) {
          const res = await axios.get('http://localhost:3000/posts');
          ctx.commit('updatePosts', res.data)
        }
    
      },
      getters: {
    
        getPosts(state) {
          return state.posts
        }
    
      }
}