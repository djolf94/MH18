<template>
  <div class="test">
    <a v-bind:href="hozier">Take me to church</a>

    <p v-on:click.shift="coordinates($event)">Koordinate ove linije su sada u konzoli (shift+click)</p>

    <input type="text" v-on:keyup.ctrl.space="spacePressed">Sve samo ne ctrl+space</input>

    <h1>{{title}}</h1>
    <p v-if="showName">Best name ever: {{user.firstName}}</p>
    <p v-else="showName">Best singer: {{user.lastName}}</p>
    <ul>
      <li v-for="item in items">{{item.title}}</li>
    </ul>
    <button v-on:click="greet('Pozdravi je Pozdravi')">Say greeting</button><br />
    <label>First name:</label><input type="text" v-model="user.firstName"></input>
    <br />
    <label>Last name:</label><input type="text" v-model="user.lastName"></input>
    <h3>{{fullName}}</h3>
  </div>
</template>

<script>
  export default {
    name: 'test',
    data() {
      return {
        hozier: "https://www.youtube.com/watch?v=PVjiKRfKpPI",
        title: "Ovo je naslov",
        user: {
          firstName: "Djordje",
          lastName: "Balasevic"
        },
        showName: true,
        items: [
          {title: "Item one"},
          {title: "Item two"},
          {title: "Item three"}
        ]
      }
    },
    methods: {
      greet: function(atr) {
        alert(atr);
      },
      spacePressed: function(e) {
        alert("Told you so");
      },
      coordinates: function(e) {
        console.log(e)
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
