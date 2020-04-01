<template lang="pug">
    div
        div.form
            <b-message v-if="errorAct" title="Неверные данные" type="is-danger" aria-close-label="Close message">
                | {{getError}}
            </b-message>
            <b-message v-if="dangerVisible" title="Заполните поле" type="is-danger" aria-close-label="Close message">
                | {{errorMessage}}
            </b-message>
            | {{dangerVisible}}
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
                dangerVisible: false,
                errorAct: false
            }
        },
        computed:mapGetters(['getToken', 'getError']),
        methods: {

            ...mapActions(['login']),

            validate() {

                this.getError.length != 0 ? this.errorAct = true : this.errorAct = false

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