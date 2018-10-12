<template>
<div class="map">
  <div class="google-map" id="map"></div>
</div>
</template>

<script>
import firebase from 'firebase'
import db from '@/firebase/init'

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
    // get current user
    let user = firebase.auth().currentUser
    console.log("User: ", user)
    // get user geolocation
    // check if user browser supports this API
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        this.lat = pos.coords.latitude
        this.lng = pos.coords.longitude

        // find user record and update geolocation property
        db.collection('users').where('user_id', '==', user.uid).get()
          .then(snapshot => {
            snapshot.forEach((doc) => {
              console.log("Doc: ", doc, doc.id)
              db.collection('users').doc(doc.id).update({
                geolocation: {
                  lat: pos.coords.latitude,
                  lng: pos.coords.longitude
                }
              })
            })
          }).then(() => {
            this.renderMap()
          })

      }, (err) => {
        console.log(err)
        this.renderMap()
      }, {
        maximumAge: 3600000,
        timeout: 3000
      })

    } else {
      // center map by default values; no user geolocation coords available
      this.renderMap()
    }

    // call a function to render map as we may want to render it at other points in the lifecycle also

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
