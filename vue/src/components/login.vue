<template>
    <div class="login">
        <h1> {{title}} </h1>

        <!-- ide .prevent da ne bi slalo po difoltu iz html-a -->
		<form v-on:submit.prevent = "logUser"> 
            <label for="inputUsername">Username</label>
    		<input type="text" id="inputUsername" placeholder="Username"
    		name="username" v-model="newUser.userName">
            <br/>  

            <label for="inputPassword4">Password</label>
      		<input type="password" id="inputPassword4" placeholder="Password"
      		name="password" v-model="newUser.password">
            <br/>    			

             <!-- poruka o gresci -->
            <p v-if="ind"> {{message}} </p>
   			  				
    	    <button type="submit" value="Log User">Log in</button>
		</form>
        

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
                this.axios.get('http://localhost:3000/api/user/' + this.newUser.userName)
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
                    this.message = "Ne postoji user sa ovim username-om";
                }
                else 
                    if (response.data.password == this.newUser.password) {
                        this.$auth.setUserLS(response.data.userName);
                        console.log('You are loged in');  
                        this.$router.push('/');    
                    }
                    else {
                        this.ind = true;
                        this.message = "Pogresan password";
                    }
            }
        }
    }
</script>