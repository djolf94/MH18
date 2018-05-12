<template>
  <div class="test">
    <button @click="leapStart">Open doors</button>
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
      controller: null,
      countIndicator: true
    };
  },
  created: function() {
    localStorage.setItem("x", 0);
    //this.leapStart();
    this.countIndicator = true;
    this.controller = new Leap.Controller();
  },
  updated: function() {},
  methods: {
  
    leapStart: function() {
      var options = { enableGestures: true };

      var normalizedDisplay = document.getElementById("normPosition");

      //var controller = new Leap.Controller();
      this.controller.on("frame", function(frame) {

        console.log("Upalio sam se")
        if (frame.pointables.length > 0) {
          var pointable = frame.pointables[0];
          //console.log(frame.pointables);

          var interactionBox = frame.interactionBox;
          var normalizedPosition = interactionBox.normalizePoint(
            pointable.tipPosition,
            true
          );
          var tipPosition = pointable.tipPosition;

          this.xCoordinate = normalizedPosition[0].toFixed(3);
          this.yCoordinate = normalizedPosition[1].toFixed(3);
          //console.log("(" + this.xCoordinate + " , " + this.yCoordinate + ") ");

          if(this.countIndicator == true){
            console.log("cao")
            if(this.xCoordinate == 1 && this.leftIndicator == true){
              localStorage.setItem("x", Number(localStorage.getItem("x")) + 1);
              this.leftIndicator = false;
              console.log("Pass");
            }
            else if(this.xCoordinate == 0 && this.rightIndicator == true){
              localStorage.setItem("x", Number(localStorage.getItem("x")) - 1);
              this.rightIndicator = false;
              console.log("Swipe right");
            }
            else if (this.xCoordinate != 0 && this.xCoordinate != 1) {
              this.leftIndicator = true;
              this.rightIndicator = true;
            }
          }

          if(this.yCoordinate == 1){
            console.log("Door close");
            this.countIndicator = false
          }


        }
      });
      this.controller.connect();
    }
    
  }
};
</script>

<style scoped>

</style>
