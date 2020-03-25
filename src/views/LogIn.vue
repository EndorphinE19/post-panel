<template lang="pug">
    div
        div.form
            <b-message v-if="dangerVisible" title="Некорректные данные" type="is-danger" aria-close-label="Close message">
                | {{errorMessage}}
            </b-message>
            <b-field label="Email">
                <b-input type="email" placeholder="Email" maxlength="30" v-model.trim="email"></b-input>
            </b-field>
            <b-field label="Password">
                <b-input type="password" placeholder="Password" password-reveal v-model.trim="password"></b-input>
            </b-field>
            <b-button type="is-primary" @click="validate()">Авторизоваться</b-button>
            
        
</template>

<script>

    import {mapActions, mapGetters} from 'vuex'

    export default {
        name: 'login',
        data() {
            return {
                email: '',
                password: '',
                errorMessage: '',
                dangerVisible: false
            }
        },
        computed:mapGetters(['getToken']),
        methods: {

            ...mapActions(['login']),

            validate() {

                if (this.email.length > 0) {
                    if (this.password.length > 0) {
                        this.dangerVisible = false
                        this.logins()
                    } else {
                        !this.dangerVisible ? this.dangerVisible = !this.dangerVisible : null
                        this.errorMessage = 'Введите пароль!'
                    }
                } else {
                    !this.dangerVisible ? this.dangerVisible = !this.dangerVisible : null
                    this.errorMessage = 'Введите Email!'
                }
            },

            logins: function () {
                this.login([this.email, this.password])  
                .catch(err => {
                    !this.dangerVisible ? this.dangerVisible = !this.dangerVisible : null
                    this.errorMessage = 'Неверный логин или пароль'
                });
            }
        }
    }
</script>

<style lang="scss">

.form {
    margin: 0 auto;
    max-width: 450px;
    width: 100%;
}

</style>