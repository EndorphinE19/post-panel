<template lang="pug">
    section
        component(:is="currentComponent('post')" :posts="getPosts")
</template>

<script>
 import post from '../components/post.vue'
 import {mapGetters,mapActions} from 'vuex'
 
export default {
    name: 'posts',
    methods: {

        ...mapActions(['fetchPosts']),

        currentComponent(component) {
            return component
        }
    },
    computed: mapGetters(['getPosts']),

    async mounted() {
        this.fetchPosts()
        
    },
    components: {
        post
    }
}
</script>