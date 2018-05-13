<template>
  <div class="test">
    <button @click="countIndicatorInit()">Open doors</button>

    


  </div>
</template>

<script>
export default {
  name: "test",
  data() {
    return {
      center: {
              lat: 44.80,
              lng: 20.45
          },
          markers: [],
      xCoordinate: "",
      yCoordinate: "",
      leftIndicator: true,
      rightIndicator: true,
      countIndicator: false,
      values: []
    };
  },
  created: function() {
    this.initValues();
    localStorage.setItem("x", 0);
    this.leapStart();
    localStorage.setItem('ci', 0);
    //this.machineLearning();
  },
  updated: function() {},
  methods: {
    machineLearning: function(){
        var net = new brain.NeuralNetwork();

        net.train([
          {input: { s1: 0.9, s2: 0.1, s3: 0 }, output: { first: 1 }},
          {input: { s1: 0.3, s2: 0.2, s3: 0.9 }, output: { third: 1 }},
          {input: { s1: 0.3, s2: 0.1, s3: 0.8 }, output: { third: 1 }},
          {input: { s1: 0.1, s2: 0.3, s3: 0.2 }, output: { nothing: 1 }},
          {input: { s1: 0.1, s2: 0.3, s3: 0.2 }, output: { nothing: 1 }},
          {input: { s1: 0.1, s2: 0.3, s3: 0.2 }, output: { nothing: 1 }},
          {input: { s1: 0.1, s2: 0.7, s3: 0.2 }, output: { second: 1 }},
          {input: { s1: 0.2, s2: 0.8, s3: 0.1 }, output: { second: 1 }},
          {input: { s1: 0.8, s2: 0.2, s3: 0.15 }, output: { first: 1 }}]);

        var output = net.run({ s1: Number(this.values[0]), s2: Number(this.values[1]), s3: Number(this.values[2]) });  // { white: 0.99, black: 0.002 }
        let max = 0;
        let key = '';
        for (let prop in output) {
          if (Number(output[prop]) > max) {
            max = Number(output[prop]);
            key = prop;
          }
        }
        this.axios.get('http://localhost:3000/critical/' + key)
                .then((response) => { //ovde mora => f-ja da bi radio this 
                    console.log(response);                  
                })
                .catch(function (error) {
                    console.log(error);
                });
    },
    countIndicatorInit: function () {
      localStorage.setItem('ci', 1);
      console.log("Open doors");
    },
    initValues: function() {
      this.axios.get('http://localhost:3000/stations/')
                .then((response) => { //ovde mora => f-ja da bi radio this
                    this.initValues2(response.data['0'].arr);              
                })
                .catch(function (error) {
                    console.log(error);
                });
    },
    initValues2: function(a) {
      this.values = a;
      this.normalize();
    },
    normalize: function() {
      var sum = 0;
      for (var i in this.values)
        sum = sum + Number(this.values[i]);
      for (var j in this.values) {
        if (Number(this.values[j]) <= 0)
          this.values[j] = 0;
        else if (Number(this.values[j])/(sum*1.0) >= 1)
          this.values[j] = 1;
        else
          this.values[j] = Number(this.values[j])/(sum*1.0);
      }

      console.log(this.values);
      this.machineLearning();
  
    },
    leapStart: function() {
      var options = { enableGestures: true };

      var normalizedDisplay = document.getElementById("normPosition");

      var controller = new Leap.Controller();
      controller.on("frame", function(frame) {

        if (frame.pointables.length > 0) {
          var pointable = frame.pointables[0];
          var interactionBox = frame.interactionBox;
          var normalizedPosition = interactionBox.normalizePoint( pointable.tipPosition, true);
          var tipPosition = pointable.tipPosition;

          this.xCoordinate = normalizedPosition[0].toFixed(3);
          this.yCoordinate = normalizedPosition[1].toFixed(3);
          //console.log("(" + this.xCoordinate + " , " + this.yCoordinate + ") ");

          if (Number(localStorage.getItem('ci')) == 1) {
            if(this.xCoordinate == 1 && this.leftIndicator == true){
              if(Number(localStorage.getItem("x")) != 0){
                  localStorage.setItem("x", Number(localStorage.getItem("x")) - 1);
                  this.leftIndicator = false;
                  console.log("Passanger out");
              }
            }
            else if(this.xCoordinate == 0 && this.rightIndicator == true){
              localStorage.setItem("x", Number(localStorage.getItem("x")) + 1);
              this.rightIndicator = false;
              console.log("Passanger in");
            }
            else if (this.xCoordinate != 0 && this.xCoordinate != 1) {
              this.leftIndicator = true;
              this.rightIndicator = true;
            }
          }          
          /*
          if(this.yCoordinate == 1){
            console.log("Door close");
            localStorage.setItem('ci', 0);
          }
          */
        }
      });
      controller.connect();
    }    
  }
};
</script>

<style scoped>

</style>
