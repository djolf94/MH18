<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark justify-content-between">

        <router-link class="navbar-brand" to="/">
            <img src="../assets/logo.png" width="60" height="40" alt="">
        </router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <router-link class="nav-link" to="/" active-class="active" exact> Home</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/login" active-class="active" exact>Login</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/register" active-class="active" exact>Register</router-link>
                </li>
            </ul>
        </div>
        <button class="btn btn-outline-primary my-2 my-sm-0" v-on:click="logOut()">Logout</button>
    </nav>
</template>

<script>
export default {
  name: "navbar",
  data() {
    return {};
  },
  methods: {
    logOut: function() {
      if (this.$auth.isAuthenticated()) {
        this.$auth.destroyUserLS();
        this.$router.push("/login");
      } 
      else 
        alert("You are not logged in");
    }
  }
};
</script>