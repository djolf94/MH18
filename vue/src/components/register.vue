<template>
    <div class="register">
        <h1> {{title}} </h1>

        <!-- ide .prevent da ne bi slalo po difoltu iz html-a -->
        <div id="text_form">
            <form v-on:submit.prevent = "addUser" >
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="inputUsername">Username</label>
                        <input class="form-control" type="text" id="inputUsername" placeholder="Username" name="username" v-model="newUser.userName">
                    </div>
                    <div class="form-group col-md-6">
                        <label for="inputPassword">Password</label>
                        <input class="form-control" type="password" id="inputPassword4" placeholder="Password" name="password" v-model="newUser.password">
                    </div>
                </div>
                <div class="form-group">
                    <label for="inputEmail4">Email</label>
                    <input class="form-control" type="email" id="inputEmail4" placeholder="Email" name="email" v-model="newUser.email">
                </div>
                <div class="form-group">
                    <label for="inputFirstName">First Name</label>
                    <input class="form-control" type="text" id="inputFirstName" placeholder="Name" name="firstName" v-model ="newUser.firstName">
                </div>
                <div class="form-group">
                    <label for="inputLastName">Last Name</label>
                    <input class="form-control" type="text" id="inputLastName" placeholder="Last name" name="lastName" v-model="newUser.lastName">
                </div>
                <button class="btn btn-dark" type="submit" value="Add User">Register</button>
            </form>
        </div>
    </div>
</template>


<script>
    export default {
        name: 'register',
        data () {
            return {
                newUser: {},
                title: "Register",
            }
        },
        methods: {
            addUser: function() {
                this.axios.post('http://localhost:3000/api/users/', {
                            //leve strane treba da se zovu kao u modelu user.js
                            userName: this.newUser.userName,
                            password: this.newUser.password,
                            firstName: this.newUser.firstName,
                            lastName: this.newUser.lastName,
                            email: this.newUser.email,
                            bookLib: []
                        })
                        .then((response) => {
                            console.log(response);
                            this.goToLogin();
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
            },
            goToLogin: function(response) {
                this.$router.push('/login');
            }
        }
    }
</script>
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
    a {
        color: #42b983;
    }
    #text_form{
        width:50%;
        margin: auto;
        
    }
    #text_form input {
        width: 100%;
        clear: both;
    }
</style>