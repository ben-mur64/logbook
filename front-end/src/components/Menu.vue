<template>
  <div id="menu">
    <nav class="navbar navbar-expand-lg justify-content-between">
        <div class="container">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                    <router-link class="nav-link" to="/">All Purchases</router-link>
                    <router-link class="nav-link" to="/mypurchases">My Purchases</router-link>
                    <router-link class="nav-link" to="/add">Update Logbook</router-link>
                    <button class="btn btn-small btn-outline-secondary align-self-center ml-auto" v-if="user" @click="logout">Logout</button>
            </div>
        </div>
    </nav>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Menu',
  props: {
    user: Object
  },
  methods: {
    async logout() {
      try {
        await axios.delete("/api/users");
        this.$root.$data.user = null;
      } catch (error) {
        this.$root.$data.user = null;
      }
    },
  }
}
</script>

<style scoped>
.nav-link, a {
  font-size: 1.25rem;
  color: #b7c1de;
}

.navbar {
  width: 100%;
  background-color: #0b468c;
  margin-bottom: 10px;
}
</style>
