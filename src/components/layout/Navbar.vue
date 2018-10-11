<template>
<div class="navbar">
  <div class="deep-purple darken-1">
    <div class="navitems container">
      <a href="" class="brand-logo">GeoNinjas</a>
      <ul class="navitems right">
        <router-link to="Signup">Signup</router-link>
        <li><a>Login</a></li>
        <router-link to="Signup" @click="logout">Logout</router-link>
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

    }
  },
  methods: {
    logout() {
      firebase.auth().signOut().then(() => {
        this.$router.push({ name: 'Signup' })
      })
    }
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
}
.navitems li {
  margin: 1em;
}
.container a {
  margin: 1em 1em 1em 0;
  color: white;
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
