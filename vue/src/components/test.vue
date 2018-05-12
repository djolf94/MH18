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
      xCoordinate: "",
      yCoordinate: "",
      leftIndicator: true,
      rightIndicator: true,
    };
  },
  created: function() {
    localStorage.setItem("x", 0);
   // this.controller = new Leap.Controller();
    this.leapStart();
    localStorage.setItem('ci', 0);    
  },
  updated: function() {},
  methods: {
    countIndicatorInit: function () {
      console.log("Open door")
      localStorage.setItem('ci', 1);
    },  
    leapStart: function() {
      var options = { enableGestures: true };

      var normalizedDisplay = document.getElementById("normPosition");

      var controller = new Leap.Controller();
      controller.on("frame", function(frame) {

        if (frame.pointables.length > 0) {
          var pointable = frame.pointables[0];
          var interactionBox = frame.interactionBox;
          var normalizedPosition = interactionBox.normalizePoint(pointable.tipPosition,true);
          var tipPosition = pointable.tipPosition;


          this.xCoordinate = normalizedPosition[0].toFixed(3);
          this.yCoordinate = normalizedPosition[1].toFixed(3);
          //console.log("(" + this.xCoordinate + " , " + this.yCoordinate + ") ");

          
          if (Number(localStorage.getItem('ci')) == 1) {
            if(this.xCoordinate == 1 && this.leftIndicator == true){
              localStorage.setItem("x", Number(localStorage.getItem("x")) - 1);
              this.leftIndicator = false;
              console.log("Passanger out");
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

          if(this.yCoordinate == 1){
            console.log("Door close");
            localStorage.setItem('ci', 0);
          }
        }
      });
      controller.connect();
    }    
  }
};
</script>

<style scoped>

</style>
