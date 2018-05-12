<template>
  <div class="test">

  </div>
</template>

<script>
export default {
  name: "test",
  data() {
    return {
      xCoordinate: "",
      yCoordinate: "",

      leftIndicator: true

    };
  },
  created: function() {
    localStorage.setItem("x", 0);
    this.leapStart();
  },
  updated: function() {},
  methods: {
  
    leapStart: function() {
      var options = { enableGestures: true };

      var normalizedDisplay = document.getElementById("normPosition");

      var controller = new Leap.Controller();
      controller.on("frame", function(frame) {

        //console.log("Upalio sam se")
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
          console.log("(" + this.xCoordinate + " , " + this.yCoordinate + ") ");

          if(this.xCoordinate == 1 && this.leftIndicator == true){
            localStorage.setItem("x", Number(localStorage.getItem("x")) + 1);
            this.leftIndicator = false;
            console.log(this.leftIndicator)
          }
          else if(this.xCoordinate == 0){
             //localStorage.setItem("x", "swipe left");
          }
          else{
            this.leftIndicator = true;
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
