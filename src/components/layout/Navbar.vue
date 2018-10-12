<template>
<div class="navbar">
  <div class="deep-purple darken-1">
    <div class="navitems container">
      <router-link :to="{name: 'GMap' }" class="brand-logo left">GeoNinjas!</router-link>
      <!-- <router-link to="GMap">GeoNinjas!</router-link> -->
      <ul class="navitems right">
        <li v-if="!user"><router-link to="Signup">Signup</router-link></li>
        <li v-if="!user"><router-link to="Login">Login</router-link></li>
        <li v-if="user"><a>{{ user.email }}</a></li>
        <li v-if="user"><a @click="logout">Logout</a></li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Navbar',
  data() {
    return {
      user: null
    }
  },
  methods: {
    logout() {
      console.log('logout click')
      firebase.auth().signOut().then(() => {
        this.$router.push({ name: 'Login' })
      })
    }
  },
  created() {
    // let user = firebase.auth().currentUser
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.user = user
      } else {
        this.user = null
      }
    })
  }
}
</script>

<style>
.navbar {
  /* display: grid; */
  width: 100%;
  height: 5em;
  background: #4444ee;
}
.navitems {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.navitems li {
  margin: 1em;
}
.container a {
  margin: 1em 1em 1em 0;
  color: white;
  cursor: pointer;
}
.container a:hover {
  color: #99bbff;
}
.brand-logo {
  font-weight: 900;
  font-size: 1.7em;
  line-height: 1em;
  color: white;
}

</style>
