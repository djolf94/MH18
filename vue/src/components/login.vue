<template>
    <div class="login">
        <h1> {{title}} </h1>

        <!-- ide .prevent da ne bi slalo po difoltu iz html-a -->
        <div id="text_form">    
            <form v-on:submit.prevent = "logUser">
                <div class="form-group">
                    <label for="inputUsername">Username</label>
                    <input class="form-control" type="text" id="inputUsername" placeholder="Username" name="username" v-model="newUser.userName">
                    <small id="emailHelp" class="form-text text-muted">We'll never share your data with anyone else.</small>
                </div>
                <div class="form-group">
                    <label for="inputPassword4">Password</label>
                    <input class="form-control" type="password" id="inputPassword4" placeholder="Password" name="password" v-model="newUser.password">
                </div>
                <p v-if="ind"> {{message}} </p>
                <button type="submit" class="btn btn-dark" value="Log User">Login</button>
            </form>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'login',
        data () {
            return {
                newUser: {},
                title: "Log in",
                ind: false,
                message: ""
            }
        },
        methods: {
            logUser: function() { //ovde ne moze =>, ako stavimo ne radi
                this.axios.get('http://localhost:3000/user/' + this.newUser.userName)
                .then((response) => { //ovde mora => f-ja da bi radio this
                    this.checkPassword(response);  
                    console.log(response);                  
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
            checkPassword: function(response) {
                if (response.data == null) {
                    this.ind = true;
                    this.message = "Non existent user";
                }
                else 
                    if (response.data.password == this.newUser.password) {
                        this.$auth.setUserLS(response.data.userName);
                        console.log('You are loged in');  
                        this.$router.push('/');    
                    }
                    else {
                        this.ind = true;
                        this.message = "Wrong password";
                    }
            }
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1, h2 {
        margin: 3%;
        font-weight: normal;
        text-align: center
    }
    ul {
        list-style-type: none;
        padding: 0;
    }
    li {
        display: inline-block;
        margin: 0 10px;
    }
    #text_form{
        width:50%;
        margin: auto
        
    }
    #text_form input {
        width: 100%;
        clear: both;
    }
    #invalidSignIn {
        color: red;
    }
</style>