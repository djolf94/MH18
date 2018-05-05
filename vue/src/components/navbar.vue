<template>
    <div class = "navbar">
        <router-link to="/">Main</router-link>
        <router-link to="/login">Log in</router-link>
        <router-link to="/register">Register</router-link>
        <button v-on:click="logOut()">Log out</button>
    </div>
</template>

<script>
    export default {
        name: 'navbar',
        data () {
            return {

            }
        },
        methods: {
            logOut: function() {
                if (this.$auth.isAuthenticated()) {
                    this.$auth.destroyUserLS();
                    this.$router.push('/login');
                }
                else
                    alert('Nisi ulogovan');
            }
        }
    }
</script>