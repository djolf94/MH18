<template>
  <div class="test">
    <br>
   <h1>Neural Network</h1>
   <h2>Training</h2>
   <br>
   <div class="loader"></div>
   <br>
   <br>
   <h2>Test</h2>

    <p id="training"></p>
   <button type="button" @click="getResults" class="btn btn-primary btn-lg">Get results</button>
   <p id="test"></p>
  
  </div>
</template>

<script>
export default {
  name: "test",
  data() {
    return {
      center: {
        lat: 44.8,
        lng: 20.45
      },
      markers: [],
      xCoordinate: "",
      yCoordinate: "",
      leftIndicator: true,
      rightIndicator: true,
      countIndicator: false,
      values: [],
      output: null
    };
  },
  created: function() {
    this.initValues();
    localStorage.setItem("x", 0);
    localStorage.setItem("ci", 0);
    //this.machineLearning();
  },
  updated: function() {},
  methods: {
    machineLearning: function() {
      var net = new brain.NeuralNetwork();

      net.train([
        { input: { s1: 0.9, s2: 0.1, s3: 0 }, output: { first: 1 } },
        { input: { s1: 0.3, s2: 0.2, s3: 0.9 }, output: { third: 1 } },
        { input: { s1: 0.3, s2: 0.1, s3: 0.8 }, output: { third: 1 } },
        { input: { s1: 0.1, s2: 0.3, s3: 0.2 }, output: { nothing: 1 } },
        { input: { s1: 0.1, s2: 0.3, s3: 0.2 }, output: { nothing: 1 } },
        { input: { s1: 0.1, s2: 0.3, s3: 0.2 }, output: { nothing: 1 } },
        { input: { s1: 0.1, s2: 0.7, s3: 0.2 }, output: { second: 1 } },
        { input: { s1: 0.2, s2: 0.8, s3: 0.1 }, output: { second: 1 } },
        { input: { s1: 0.8, s2: 0.2, s3: 0.15 }, output: { first: 1 } }
      ]);

       this.output = net.run({
        s1: Number(this.values[0]),
        s2: Number(this.values[1]),
        s3: Number(this.values[2])
      }); // { white: 0.99, black: 0.002 }
      let max = 0;
      let key = "";
      for (let prop in this.output) {
        if (Number(this.output[prop]) > max) {
          max = Number(this.output[prop]);
          key = prop;
        }
      }

      this.axios
        .get("http://localhost:3000/critical/" + key)
        .then(response => {
          //ovde mora => f-ja da bi radio this
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    countIndicatorInit: function() {
      localStorage.setItem("ci", 1);
      console.log("Open doors");
    },
    initValues: function() {
      this.axios
        .get("http://localhost:3000/stations/")
        .then(response => {
          //ovde mora => f-ja da bi radio this
          this.initValues2(response.data["0"].arr);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    initValues2: function(a) {
      this.values = a;
      this.normalize();
    },
    normalize: function() {
      var sum = 0;
      for (var i in this.values) sum = sum + Number(this.values[i]);
      for (var j in this.values) {
        if (Number(this.values[j]) <= 0) this.values[j] = 0;
        else if (Number(this.values[j]) / (sum * 1.0) >= 1) this.values[j] = 1;
        else this.values[j] = Number(this.values[j]) / (sum * 1.0);
      }

      console.log(this.values);
      document.getElementById("training").innerHTML = this.values;
      this.machineLearning();
    },
    getResults: function(){
      document.getElementById("test").innerHTML = "( " + this.output.first + " , " +
                                                          this.output.second + " , " + 
                                                          this.output.third + ") ";

    }
  }
};
</script>

<style scoped>

.loader {
    border: 16px solid #f3f3f3; /* Light grey */
    border-top: 16px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 120px;
    height: 120px;
    margin: auto;
    animation: spin 2s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

</style>
