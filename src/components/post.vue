<template lang="pug">

    div
        div.posts
            div.posts__add(v-if="getToken === 'writer'")
                <b-button class="addPost" @click="openPanelAdd()">Добавить пост</b-button>
                div(v-if="visibleAdd")
                    <b-field>
                        <b-input placeholder="Заколовок поста" type="text" v-model="add.title"></b-input>
                    </b-field>
                    <b-field label="Message">
                        <b-input maxlength="200" type="textarea" placeholder="Контент поста" v-model="add.content"></b-input>
                    </b-field>
                    <b-button class="savePost" @click="addPosts(add.title, add.content)">Сохранить</b-button>
            div.pagination-button
                b-button(@click="prevPage()" :disabled="pageNumber == 0")
                    | Previous
                b-button(@click="nextPage()" :disabled="pageNumber >= pageCount - 1")
                    | Next
            h5 Page : {{pageNumber}}
            | {{pageCount}}
            div.post(v-for="(post, indx) in paginatedData" :key="post.id")
                h3 {{post.title}}
                p {{post.description}}
                div.post__navigate(v-if="getToken === 'writer'")
                    <button class="button" @click="openPopupAndId(post.id)">
                        | Изменить
                    </button>
                    b-button(type="is-danger" icon-right="delete" @click="deletePost(post.id)")
                        | Delete
                div.post__navigate(v-if="getToken === 'reader'")
                    b-button(@click="updateClaps(post.id, indx)")
                        | Хлопнуть
                        | {{post.claps}}
        <b-modal :active.sync="isImageModalActive">
            <b-field>
                <b-input placeholder="Заколовок поста" type="text" v-model="update.title"></b-input>
            </b-field>
            <b-field label="Message">
                <b-input maxlength="200" type="textarea" placeholder="Контент поста" v-model="update.content"></b-input>
            </b-field>
            <b-button class="savePost" @click="updatePosts(postId, update.title, update.content)">Сохранить</b-button>
        </b-modal>
</template>

<script>

import {mapMutations, mapGetters} from 'vuex'

export default {
    props: {
        posts: Array
    },
    data() {
        return {
            visibleAdd: false,
            visibleUpdate: false,
            isImageModalActive: false,
            postId: 0,
            add: {
                title: '',
                content: ''
            },
            update: {
                title: '',
                content: ''
            },

            //pagination property
            pageNumber: 0,
            size: 10
            ///

        }
    },
    name: 'post',
    computed: {
        ...mapGetters({
            getToken: 'getToken',
            getUser: 'getUser',
            getPosts: 'getPosts'
        }),

        pageCount(){
            let l = this.getPosts.length,
                s = this.size;
            
            return Math.ceil(l/s);
        },

        paginatedData(){
            const start = this.pageNumber * this.size,
                  end = start + this.size;
            return this.getPosts.slice(start, end);
        }
    },
    methods: {
        
        ...mapMutations({
            del: 'deletePostState',
            create: 'createPost',
            uc: 'updateClap',
            up: 'updatePost'
        }),

        deletePost(postId) {
            this.del(postId)
        },

        addPosts(title, content) {
            
            if ((title.length > 0) && (content.length > 0)) {
                this.create([title, content, this.getUser])
                this.add.title = this.add.content = ''
            }
            
        },

        updatePosts(...data) {

            if ((data[1].length > 0) && (data[2].length > 0)) {
                this.up(data)
                this.update.title = this.update.content = ''
            }
            
        },

        updateClaps(id) {
            this.uc(id)
        },

        openPanelAdd() {
            this.visibleAdd = !this.visibleAdd
        },

        openPanelUpdate() {
            this.visibleUpdate = !this.visibleUpdate
        },

        openPopupAndId(id) {
            this.postId = id
            this.isImageModalActive = !this.isImageModalActive
        },
        
        //pagination methods
        nextPage() {
            this.pageNumber++
        },
        
        prevPage() {
            this.pageNumber--
        }
        ///
    }
}
</script>

<style lang="scss" scoped>

    .posts {

            margin: 0 auto;
            max-width: 450px;

        &__add {
           
            width: 100%;
            padding-bottom: 15px;

            .addPost {
                margin-bottom: 15px;
            }
        }

        .post {
            position: relative;
            margin-bottom: 15px;
            padding: 10px;
            padding-top: 30px;
            background: #fff;
            border-radius: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            overflow-x: hidden;

            h3 {
                text-transform: uppercase;
                color: #7957d5;
                font: {
                    size:25px;
                    weight: bold;
                }
            }

            &__navigate {
                padding-top: 15px;
                width: 100%;
                display: flex;
                justify-content: flex-end;

                button {
                    margin-right: 5px;

                    &:last-of-type {
                        margin-right: 0;
                    }
                }
            }
        }
    }

    .pagination-button {
        padding: 10px;

        button {
            margin: 3px;
        }
    }

</style>