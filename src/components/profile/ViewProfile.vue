<template>
  <div class="view-profile container">
    <div class="card" v-if="profile">
      <h2 class="deep-purple-text center">{{ profile.alias }}'s Wall</h2>
      <ul class="comments collection">
        <li>comment</li>
      </ul>
      <form @submit.prevent="addComment">
        <div class="field">
          <label for="comment">Add a comment</label>
          <input type="text" name="comment" v-model="newComment">
          <p v-if="feedback" class="red-text center">{{ feedback }}</p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import db from '@/firebase/init'

export default {
  name: 'ViewProfile',
  data() {
    return {
      profile: null,
      newComment: null,
      feedback: null,
      user: null
    }
  },
  created() {
    let ref = db.collection('users')

    // get current user
ref.where('user_id', '==', firebase.auth().currentUser.uid).get()
.then(snapshot => {
  snapshot.forEach(doc => {
  this.user = doc.data(),
  this.user.id = doc.id
  })
})

    ref.doc(this.$route.params.id).get()
    .then(user => {
      this.profile = user.data()
    })
  },
  methods: {
    addComment() {
      if(this.newComment) {
        this.feedback = null
        db.collection('comments').add({
          to: this.$route.params.id, // when on a profile page, can get id from URL
          from: this.user.id,
          content: this.newComment,
          time: Date.now()
        }).then(() => {
          this.newComment = null
        })
      } else {
        this.feedback = "Comments cannot be blank"
      }
    }
  }
}
</script>
