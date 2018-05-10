<template>
  <div class="mainPage">
    <div class="jumbotron">
    <h1 class="display-4" v-if="showName">Hello, {{user.firstName}}!</h1>
    <p class="lead">If your name is {{fullName}} everything is set up</p>
    <hr class="my-4">
    <p class="lead"><a class="btn btn-secondary btn-lg" href="#" role="button"><img src="../assets/logo.png" width="60" height="40" alt=""></a></p>
    <table>
      <tr v-for="book in books">
        <td><img v-bind:src = "book.url" height = "150px" width = "100px"></td>
        <td>{{book.name}}</td>
        <td>{{book.author}}</td>
        <td v-bind:title = "book.description" 
            style = "text-decoration: underline;
                     color: blue;">
            see description
        </td>
        <td>
          <button v-on:click = "buyBook(book._id)">Buy</button>
        </td>
      </tr>
    </table>
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
          lastName: "",
          bookLib: []
        },
        books: [],
        showName: true
      }
    },
    //hooks created i updated
    created: function() {
        this.initUser();
        this.initBooks();
    },
    updated: function() {
    },
    methods: {
      initUser: function() {
        this.axios.get("http://localhost:3000/api/user/" + this.$auth.getUserLS())
          .then((response) => { 
            var f = response.data.firstName;
            var l = response.data.lastName;          
            this.user.bookLib = response.data.bookLib;

            if (!(f == undefined))
              this.user.firstName = f;

             if (!(l == undefined))
              this.user.lastName = l;
            
            console.log("Uzeli smo ime i prezime logovanog usera");                  
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      initBooks: function() {
        this.axios.get("http://localhost:3000/api/books/")
        .then((response) => {
          console.log(response);
          for(var i in response.data){
            if(this.user.bookLib.indexOf(response.data[i]._id) > -1) 
              continue;
            this.books.push(response.data[i]);
          }
        })
        .catch(function (error){
          console.log(error);
        })
      },
      buyBook: function(boughtBook) {
        this.axios.post("http://localhost:3000/api/books/", {
          user: this.$auth.getUserLS(),
          book: boughtBook
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
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
