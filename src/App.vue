<template>
  <div id="app">
    <div id="nav">
      <div v-if="getToken != ''">
        <b-button type="is-danger" @click="logouts()">Logout</b-button>
      </div>
      <b-button type="is-link">
        <router-link to="/">Home</router-link>
      </b-button>
      <b-button type="is-link">
        <router-link to="/log">LogIn</router-link>
      </b-button>
      <b-button type="is-link">
        <router-link to="/posts">Posts</router-link>
      </b-button>
      <hr>
      <router-view/>
    </div>
    <div class="logout">
      {{getToken || 'no user'}}
    </div>
  </div>
</template>

<script>

import {mapGetters, mapMutations} from 'vuex'

export default {
  computed: {
    ...mapGetters(['getToken', 'getUSer'])
  },
  methods: {
    ...mapMutations(['logout']),

    logouts() {
      this.logout()
    }
  }
}
</script>>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

#nav {
  padding: 30px;

  .is-link {
    margin: 10px;
  }

  a {
    font-weight: bold;
    color: #fff;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.logout {
  position: absolute;
  top: 5px;
  right: 10px;
  text-transform: uppercase;
  border: 1px solid black;
  border-radius: 3px;
  padding: 5px 10px;
}
</style>
