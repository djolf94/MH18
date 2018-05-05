<template>
    <div class="register">
        <h1> {{title}} </h1>

        <!-- ide .prevent da ne bi slalo po difoltu iz html-a -->
		<form v-on:submit.prevent = "addUser"> 
            <label for="inputUsername">Username</label>
    		<input type="text" id="inputUsername" placeholder="Username"
    		name="username" v-model="newUser.userName">
            <br/>  

            <label for="inputPassword4">Password</label>
      		<input type="password" id="inputPassword4" placeholder="Password"
      		name="password" v-model="newUser.password">
            <br/> 
            
    		<label for="inputFirstName">First Name</label>
    		<input type="text" id="inputFirstName" placeholder="Name"
    		name="firstName" v-model ="newUser.firstName">
            <br/> 			
  			
    		<label for="inputLastName">Last Name</label>
    		<input type="text" id="inputLastName" placeholder="Last name"
    		name="lastName" v-model="newUser.lastName">
            <br/>     					
  			
      		<label for="inputEmail4">Email</label>
      		<input type="email" id="inputEmail4" placeholder="Email"
      		name="email" v-model="newUser.email">
            <br/>        			
   			  				
    	    <button type="submit" value="Add User">Register</button>
		</form>
        

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
                            email: this.newUser.email
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

