<template>
  <div class="mainPage">
    <div class="jumbotron">
    <h1 class="display-4" v-if="showName">Hello, {{user.firstName}}!</h1>
    <p class="lead">If your name is {{fullName}} everything is set up</p>
    <hr class="my-4">
    <p class="lead"><a class="btn btn-secondary btn-lg" href="#" role="button"><img src="../assets/logo.png" width="60" height="40" alt=""></a></p>
</div>
  </div>
</template>

<script>
  export default {
    name: 'test',
    data() {
      return {
        user: {
          firstName: "",
          lastName: ""
        },
        showName: true
      }
    },
    //hooks created i updated
    created: function() {
        this.initUser();
    },
    updated: function() {
    },
    methods: {
      initUser: function() {
        this.axios.get("http://localhost:3000/api/user/" + this.$auth.getUserLS())
          .then((response) => { 
            var f = response.data.firstName;
            var l = response.data.lastName;          

            if (!(f == undefined))
              this.user.firstName = f;

             if (!(l == undefined))
              this.user.lastName = l;
            
            console.log("Uzeli smo ime i prezime logovanog usera");                  
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    computed: {
      fullName: function() {
        return this.user.firstName + " " + this.user.lastName;
      }
    }
  }
</script>

<style scoped>


</style>
