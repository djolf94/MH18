<template>
  <div class="test">
    <!--sa v-bind bajndujemo HTML atribute ako hocemo da vrednost atributa bude Vue promenljiva -->
    <a target='_blank' v-bind:href="JBJ">Shot through the heart and you're to blame...</a>
    <!--sa $event prosledimo event f-ji koji smo uhvatili u v-on listeneru  -->
    <p v-on:click.shift="coordinates($event)">Koordinate ove linije su sada u konzoli (shift+click)</p>

    <p>HOOKS: {{edits}}</p>
    <br />

    <input type="text" v-on:keyup.ctrl.space="spacePressed">Sve samo ne ctrl+space

    <h1>{{title}}</h1>
    <label>Unesite boju: </label><input type="text" v-model="colorInput">

    <!-- jednostuke {} znaci da ce se doslovno upisati u v-bind ono sto pise
     promenljive se izracunavaju same kao sto vidimo gore u v-bind:href tako da nju samo navedemo
     ostalo pod jednostuke navodnike da bi vue znao stringovi a ne neke promenljive
     posto ne postoji promenljiva color ovde je moglo i bez ''
     mogli smo i neki computed "color:" + colorInput -->
    <p v-if="showName" v-bind:style="{'color': colorInput}">Best name ever: {{user.firstName}}</p>
    <p v-else>Best singer: {{user.lastName}}</p>
    <ul>
      <li v-for="item in items">{{item.title}}</li>
    </ul>
    <button v-on:click="greet('Hello, is it me you\'re looking for')">Say greeting</button><br />
    <label>First name:</label><input type="text" v-model="user.firstName">
    <br />
    <label>Last name:</label><input type="text" v-model="user.lastName">

    <p> Computed: {{fullName}} Computed (+filteri): {{ fullName | uc(false) | reverseFilter }} </p>
  </div>
</template>

<script>
  export default {
    name: 'test',
    data() {
      return {
        JBJ: "https://www.youtube.com/watch?v=KrZHPOeOxQQ",
        title: "Ovo je naslov",
        colorInput: "tomato",
        edits: "",
        brojac: 0,
        user: {
          firstName: "Djordje",
          lastName: "Balasevic"
        },
        showName: true,
        items: [
          {title: "Primer"},
          {title: "za"},
          {title: "v-for"}
        ]
      }
    },
    //hooks created i updated
    created: function() {
      this.edits = "Stranica je sveze izrenderovana";
      this.initUser();
    },
    updated: function() {
      this.brojac++;
      /*
      Ovde ne moze da se ispise broj promena na stranici jer kada se ispise 1 to je jos jedna nova promena
      aktivira se hook, brojac ide na dva ispisuje se 2, posto se ispisalo to je nova promena aktivira se hook...
      sve zakuca u mrtvoj petlji
      */
      this.edits = "Bilo je promena u sadrzaju komponente, pogledajte broj promena u konzoli";
      console.log(this.brojac);
    },
    methods: {
      greet: function(atr) {
        alert(atr);
      },
      spacePressed: function(e) {
        alert("Told you so");
      },
      coordinates: function(e) {
        console.log(e);
      },
      initUser: function() {
        console.log();
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
    //filteri sluze za neke proste transformacije teksta. Sve komplikovanije bolje odraditi u computed
    filters: {
      uc: function(arg, onlyFirst){  // gore u pozivu niska je automatski prvi argument, ostale navodimo redom
        if (!arg) return ''; //obavezna provera inace ce da pukne program
        arg = arg.toString();
        if (onlyFirst)
          return arg.charAt(0).toUpperCase() + arg.slice(1);
        else
          return arg.toUpperCase();
      },
      reverseFilter: function(arg) {
        if (!arg) return '';
        return arg.split("").reverse().join(""); //reverse radi samo za Array
      }
    },
    computed: {
      boja: function() {
        return "color:" + this.colorInput;
      },
      fullName: function() {
        return this.user.firstName + " " + this.user.lastName;
      }
    }
  }
</script>

<style scoped>


</style>
