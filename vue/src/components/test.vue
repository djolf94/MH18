<template>
  <div class="test">
    <button @click="countIndicatorInit()">Open doors</button>

    <GmapMap
  :center="center"
  :zoom="7"
  map-type-id="terrain"
  style="width: 1365px; height: 545px"
>
  <GmapMarker
    :key="index"
    v-for="(m, index) in markers"
    :position="m.position"
    :clickable="true"
    :draggable="true"
    @click="center=m.position"
  />
</GmapMap>

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
          styles: [
            {
                "elementType": "geometry",
                "stylers": [
                {
                    "color": "#1d2c4d"
                }
                ]
            },
            {
                "elementType": "labels.text.fill",
                "stylers": [
                {
                    "color": "#8ec3b9"
                }
                ]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [
                {
                    "color": "#1a3646"
                }
                ]
            },
            {
                "featureType": "administrative.country",
                "elementType": "geometry.stroke",
                "stylers": [
                {
                    "color": "#4b6878"
                }
                ]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "labels.text.fill",
                "stylers": [
                {
                    "color": "#64779e"
                }
                ]
            },
            {
                "featureType": "administrative.province",
                "elementType": "geometry.stroke",
                "stylers": [
                {
                    "color": "#4b6878"
                }
                ]
            },
            {
                "featureType": "landscape.man_made",
                "elementType": "geometry.stroke",
                "stylers": [
                {
                    "color": "#334e87"
                }
                ]
            },
            {
                "featureType": "landscape.natural",
                "elementType": "geometry",
                "stylers": [
                {
                    "color": "#023e58"
                }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                {
                    "color": "#283d6a"
                }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [
                {
                    "color": "#6f9ba5"
                }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.stroke",
                "stylers": [
                {
                    "color": "#1d2c4d"
                }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry.fill",
                "stylers": [
                {
                    "color": "#023e58"
                }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [
                {
                    "color": "#3C7680"
                }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [
                {
                    "color": "#304a7d"
                }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.text.fill",
                "stylers": [
                {
                    "color": "#98a5be"
                }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.text.stroke",
                "stylers": [
                {
                    "color": "#1d2c4d"
                }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [
                {
                    "color": "#2c6675"
                }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [
                {
                    "color": "#255763"
                }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.text.fill",
                "stylers": [
                {
                    "color": "#b0d5ce"
                }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.text.stroke",
                "stylers": [
                {
                    "color": "#023e58"
                }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "labels.text.fill",
                "stylers": [
                {
                    "color": "#98a5be"
                }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "labels.text.stroke",
                "stylers": [
                {
                    "color": "#1d2c4d"
                }
                ]
            },
            {
                "featureType": "transit.line",
                "elementType": "geometry.fill",
                "stylers": [
                {
                    "color": "#283d6a"
                }
                ]
            },
            {
                "featureType": "transit.station",
                "elementType": "geometry",
                "stylers": [
                {
                    "color": "#3a4762"
                }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                {
                    "color": "#0e1626"
                }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [
                {
                    "color": "#4e6d70"
                }
                ]
            }
        ],
      xCoordinate: "",
      yCoordinate: "",
      leftIndicator: true,
      rightIndicator: true,
      countIndicator: false
    };
  },
  created: function() {
    localStorage.setItem("x", 0);
    this.leapStart();
    localStorage.setItem('ci', 0);
    this.machineLearning(); 
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

        var output = net.run({ s1: 0.2, s2: 0.3, s3: 0.4 });  // { white: 0.99, black: 0.002 }
        console.log(output);
      
    },
    countIndicatorInit: function () {
      localStorage.setItem('ci', 1);
      console.log("Open doors");
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
