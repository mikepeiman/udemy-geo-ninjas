<template>
<div class="map">
  <div class="google-map" id="map"></div>
</div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'GMap',
  data() {
    return {
      lat: 49.236,
      lng: -123.01697
    }
  },
  methods: {
    renderMap() {
      const map = new google.maps.Map(document.getElementById('map'), {
        center: {
          lat: this.lat,
          lng: this.lng
        },
        zoom: 9,
        maxZoom: 20,
        minZoom: 3,
        streetViewControl: false
      })

    }
  },
  mounted() {
    // call a function to render map as we may want to render it at other points in the lifecycle also
    this.renderMap()
    console.log(firebase.auth().currentUser)
  }
}
</script>

<style>
.google-map {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: #ddeeff;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}
</style>
